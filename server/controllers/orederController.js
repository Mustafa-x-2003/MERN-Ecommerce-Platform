import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
    );
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    if (cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot create an order from an empty cart",
      });
    }
    const productsCart = cart.products;
    const allItemsInStock = productsCart.every((product) => {
      return product.product && product.product.stock >= product.quantity;
    });
    if (!allItemsInStock) {
      return res.status(400).json({
        success: false,
        message: "One or more products are out of stock",
      });
    }
    let totalPrice = 0;
    const items = [];
    productsCart.forEach((product) => {
      totalPrice += product.product.price * product.quantity;
      product.product.stock -= product.quantity;
      items.push({
        product: product.product._id,
        name: product.product.name,
        price: product.product.price,
        quantity: product.quantity,
      });
    });

    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress: {
        name: req.body.name,
        phone: req.body.phone,
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        building: req.body.building,
      },
      totalPrice,
    });

    await order.save();
    for (const item of productsCart) {
      await item.product.save();
    }
    cart.products = [];

    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};
export const getOrder = async (req, res) => {
  try {
    const orderID = req.params.id;
    if (!orderID || !mongoose.Types.ObjectId.isValid(orderID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }
    const order = await Order.findOne({ _id: orderID, user: req.user._id });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};

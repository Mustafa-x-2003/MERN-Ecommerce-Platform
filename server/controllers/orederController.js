import Oreder from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("products.product")
      .session(session);
    if (!cart) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    if (cart.products.length === 0) {
      await session.abortTransaction();
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
      await session.abortTransaction();
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

    const order = new Oreder({
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

    await order.save({ session });
    for (const item of productsCart) {
      await item.product.save({ session });
    }
    cart.products = [];

    await cart.save({ session });
    await session.commitTransaction();
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  } finally {
    await session.endSession();
  }
};
export const getOrders = async (req, res) => {
  try {
    const orders = await Oreder.find({ user: req.user._id });
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

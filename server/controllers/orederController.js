import Oreder from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
    );
    if (!cart || cart.products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const productsCart = cart.products;
    const allItemsInStock = productsCart.every((product) => {
      return product.product && product.product.stock >= product.quantity;
    });
    if (!allItemsInStock) {
      return res.status(400).json({
        success: false,
      });
    }
    let totalPrice = 0;
    const items = [];
    productsCart.forEach((product) => {
      totalPrice += product.product.price * product.quantity;
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
    await order.save();
    cart.products = [];
    await cart.save();
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

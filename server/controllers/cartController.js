import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const addToCart = async (req, res) => {
  try {
    const user = req.user;
    const productID = req.params.id;
    if (!productID) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
        error: {
          code: "MISSING_PRODUCT_ID",
        },
      });
    }
    const product = await Product.findOne({ _id: productID });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        error: {
          code: "PRODUCT_NOT_FOUND",
        },
      });
    }

    let cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      cart = new Cart({
        user: user._id,
        products: [{ product: product._id, quantity: 1 }],
      });
    } else {
      const existingProduct = cart.products.find(
        ({ product }) => product.toString() === productID,
      );
      if (existingProduct) {
        if (product.stock > existingProduct.quantity) {
          existingProduct.quantity += 1;
        } else {
          return res.status(400).json({
            success: false,
            message: "Not enough product stock available",
            error: {
              code: "INSUFFICIENT_STOCK",
            },
          });
        }
      } else {
        cart.products.push({ product: productID, quantity: 1 });
      }
    }
    await cart.save();
    res.status(200).json({
      message: "done",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding product to cart",
      error: {
        error: error.message,
        code: "INTERNAL_SERVER_ERROR",
      },
    });
  }
};
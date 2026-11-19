import mongoose from "mongoose";
import slugify from "slugify";
// - image cover
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minlength: [20, "Description must be at least 2 characters"],
      maxlength: [2000, "Description cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },
    priceAfterDiscount: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    colors: [String],
    imageCaver: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    stock: {
      type: Number,
      default: 0,
      required: true,
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { Timestamps: true },
);
productSchema.pre("save", async function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});
const Product = mongoose.model("Product", productSchema);
export default Product;

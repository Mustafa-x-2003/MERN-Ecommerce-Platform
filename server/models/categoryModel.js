import mongoose from "mongoose";
import slugify from "slugify";
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);
categorySchema.pre("save", async function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});
const Category = mongoose.model("Category", categorySchema);
export default Category;

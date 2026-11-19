import mongoose from "mongoose";
import slugify from "slugify";
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
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

brandSchema.pre("save", async function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;

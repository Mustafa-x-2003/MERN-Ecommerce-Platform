import dotenv from "dotenv";
import connectDB from "./config/db.js";

import categories from "./test/categorys.js";
import subCategories from "./test/subCategories.js";
import brands from "./test/brands.js";
import products from "./test/products.js";

import Category from "./models/categoryModel.js";
import SubCategory from "./models/subCategoryModel.js";
import Brand from "./models/brandModel.js";
import Product from "./models/productModel.js";

dotenv.config();

const action = process.argv[2];

async function seedDatabase() {
  try {
    await connectDB();

    if (action === "--i") {
      // Insert all data
      await Category.insertMany(categories);
      await SubCategory.insertMany(subCategories);
      await Brand.insertMany(brands);
      await Product.insertMany(products);
    } else if (action === "--d") {
      // Delete all data
      await Category.deleteMany({});
      await SubCategory.deleteMany({});
      await Brand.deleteMany({});
      await Product.deleteMany({});
    } else {
      console.log("Please provide a valid action: insert or delete");
    }

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();

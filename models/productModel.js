const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
});

const Product = mongoose.model("Product", userSchema);
module.exports = Product;

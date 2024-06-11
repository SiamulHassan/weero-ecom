const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    // unique ture -> same product multiple ? just increse/decrease the 'stock' property
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // stock property here
});

const Product = mongoose.model("Product", userSchema);
module.exports = Product;

const AppError = require("../utils/appError");
const catchAsyncErr = require("../utils/catchAsyncErr");
const Product = require("../models/productModel");
///////////////////// CREATING PRODUCT
exports.createProduct = catchAsyncErr(async (req, res, next) => {
  const { productName, category, description, price } = req.body;
  if (!productName || !category || !description || !price) {
    next(new AppError("You missed a required field !", 400));
  }
  const createdProduct = await Product.create({
    productName,
    category,
    description,
    price,
  });
  res.status(201).json({
    status: "success",
    data: createdProduct,
  });
});

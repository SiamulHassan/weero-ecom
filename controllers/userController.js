const AppError = require("../utils/appError");
const catchAsyncErr = require("../utils/catchAsyncErr");
const User = require("../models/userModel");
const Product = require("../models/productModel");

///////////////// CREATING USER
exports.createUser = catchAsyncErr(async (req, res, next) => {
  const { userName } = req.body;
  if (!userName) {
    return next(new AppError("user Name is required!", 400));
  }
  const createdUser = await User.create({
    userName,
  });
  res.status(201).json({
    status: "success",
    data: createdUser,
  });
});
///////////////// GET USER
exports.getUser = catchAsyncErr(async (req, res, next) => {
  const users = await User.find();
  res.status(201).json({
    status: "success",
    data: users,
  });
});
///////////////// GET USER
exports.addWishList = catchAsyncErr(async (req, res, next) => {
  const { userId } = req.params;
  const { productId } = req.body;

  // find the user
  const user = await User.findById(userId);

  // get product ID
  const product = await Product.findById(productId);

  // if not user or product send error
  if (!user || !product) {
    return next(new AppError("No user or product found", 400));
  }

  // add product Id to the user's wishlist
  user.wishlist.push(product._id);
  await user.save();

  res.status(201).json({
    status: "success",
    data: user,
  });
});

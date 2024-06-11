const AppError = require("../utils/appError");
const catchAsyncErr = require("../utils/catchAsyncErr");
const User = require("../models/userModel");

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

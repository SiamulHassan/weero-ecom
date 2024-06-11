const AppError = require("../utils/appError");
const catchAsyncErr = require("../utils/catchAsyncErr");

///////////////// CREATING USER
exports.createUser = catchAsyncErr(async (req, res, next) => {
  const { userName } = req.body;
  console.log(userName);
  if (!userName) {
    return next(new AppError("err", 400));
  }
});

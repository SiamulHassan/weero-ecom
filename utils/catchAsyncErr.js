// try...catch is messy for catching err. so we wrap our async function with catchAsyncErr

const catchAsyncErr = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
module.exports = catchAsyncErr;

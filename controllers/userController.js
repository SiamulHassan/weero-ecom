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
///////////////// ADD TO WISHLIST
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
///////////////// INTERESTED IN PRODUCTS BASED ON USER'S WISHLIST
exports.interestedIn = catchAsyncErr(async (req, res, next) => {
  const { userId } = req.params;

  // POPULATE WISHLIST
  const user = await User.findById(userId).populate("wishlist");

  // HANDLING EMPTY USER
  if (!user) {
    return next(new AppError("No user found", 400));
  }

  // HANDLING EMPTY WISHLIST
  if (user.wishlist.length === 0) {
    return next(new AppError("Wishlist is empty", 400));
  }

  // RECOMMANDING PRODUCTS
  const wishlistData = user.wishlist.reduce(
    (acc, product) => {
      acc.categories.add(product.category);
      acc.productIds.push(product._id);
      return acc;
    },
    { categories: new Set(), productIds: [] }
  );
  // convert Set to an array
  const categoriesArray = Array.from(wishlistData.categories);

  // Calculate how many products to take from each category
  const productsPerCategory = Math.ceil(10 / categoriesArray.length);
  const categoryPromises = categoriesArray.map((category) =>
    Product.find({
      category,
      _id: { $nin: wishlistData.productIds },
    }).limit(productsPerCategory)
  );
  // Product.find returns promise. For multiple query it will return multiple promise.
  const categoryResults = await Promise.all(categoryPromises);

  // Flatten the array of arrays and limit to 10 items
  const productInterestedIn = categoryResults.flat().slice(0, 10);

  res.status(200).json({
    status: "success",
    data: productInterestedIn,
  });
});

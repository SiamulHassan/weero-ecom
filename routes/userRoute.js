const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
//////////////////// CREATE USER
userRouter.post("/", userController.createUser);
//////////////////// GET USER
userRouter.get("/", userController.getUser);
//////////////////// ADD PRODUCT TO WISHLIST
userRouter.post("/:userId/wishlist", userController.addWishList);
//////////////////// RECOMMANDED WISHLIST PRODUCTS
userRouter.get("/:userId/interestedIn", userController.interestedIn);

module.exports = userRouter;

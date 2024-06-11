const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
//////////////////// CREATE USER
userRouter.post("/", userController.createUser);
//////////////////// GET USER
userRouter.get("/", userController.getUser);
module.exports = userRouter;

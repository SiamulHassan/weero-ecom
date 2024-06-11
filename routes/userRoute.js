const express = require("express");
const userRouter = express.Router();

//////////////////// REGISTRATION
userRouter.post("/", () => {
  console.log("uesr route");
});
module.exports = userRouter;

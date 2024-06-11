// require modules
const express = require("express");
const cors = require("cors");
const dbConnection = require("./dbConfig/mongoDbConfig");
const AppError = require("./utils/appError");
const captureErrGlobally = require("./controllers/globalErrController");

// requiring routes
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");

// db connection
dbConnection();

// golbal mw
const app = express();
app.use(cors());
app.use(express.json());

// app routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

// if no route matchs
app.use("*", (req, res, next) => {
  // passing err to next(), the err will be capture by 'captureErrGlobally'
  // when we are calling AppError - err obj is instantiated(created, by AppError constructor). so err occurs just here which will be captured by stack trace
  next(new AppError(`Cann't find ${req.originalUrl}`, 400));
});

//global err handling mw

app.use(captureErrGlobally);

module.exports = app;

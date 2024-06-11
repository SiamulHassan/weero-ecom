const mongoose = require("mongoose");
const dbConnection = () =>
  mongoose
    .connect(
      "mongodb+srv://syeam45:QVtr7okN7btQEa05@cluster0.31qchmo.mongodb.net/"
    )
    .then(() => console.log("db connected"));
module.exports = dbConnection;

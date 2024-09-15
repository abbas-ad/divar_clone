const { default: mongoose } = require("mongoose");
require("dotenv").config();
// connected the express app to mongodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error: Error) => {
    console.log(error?.message ?? "Failes db connections");
  });

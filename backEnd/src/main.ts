import express, { Application } from "express";
import dotEnv from "dotenv";
import cookieParser from "cookie-parser";
var cors = require("cors");
const path = require("path");

import AuthRouter from "./router/auth.router";
import NotFoundHandlers from "./common/exception/notfound-handler";
import AllExceptionHandler from "./common/exception/all-exception.handler";
import UserRouter from "./router/user.router";
import CategoryRouter from "./router/category.router";
import NavigationRouter from "./router/navigations.router";
import UploadRouter from "./router/upload.router";

dotEnv.config();

// create the express Server
async function main() {
  // get PORT from env file
  const PORT = process.env.PORT;
  // create express server
  const app: Application = express();

  // called the mongodb serevr to get ready
  require("./config/mongoose.config");
  // middleware
  const corsOptions = {
    origin: "http://localhost:3000", // آدرس Frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // برای کوکی‌ها و احراز هویت
  };
  
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  // app router
  app.use("/api/auth", AuthRouter);
  app.use("/api/user", UserRouter);
  app.use("/api/category", CategoryRouter);
  app.use("/api/navigation", NavigationRouter);
  app.use("/api/upload", UploadRouter);

  NotFoundHandlers(app);
  AllExceptionHandler(app);

  // running the applications ot port: ${PORT}
  app.listen(PORT, () => {
    console.log(`[server]:  Running on PORT ${PORT}`);
  });
}

main();

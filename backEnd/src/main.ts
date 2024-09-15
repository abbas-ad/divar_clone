import express, { Express, Request, Response, Application } from "express";
import dotEnv from "dotenv";
import cookieParser from "cookie-parser";

import AuthRouter from "./router/auth.router";
import NotFoundHandlers from "./common/exception/notfound-handler";
import AllExceptionHandler from "./common/exception/all-exception.handler";
import UserRouter from "./router/user.router";

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
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
  app.use("/api/auth", AuthRouter);
  app.use("/api/user", UserRouter);
  NotFoundHandlers(app);
  AllExceptionHandler(app);

  // running the applications ot port: ${PORT}
  app.listen(PORT, () => {
    console.log(`[server]:  Running on PORT ${PORT}`);
  });
}

main();

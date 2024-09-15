import { Router } from "express";
import AuthController from "./../controller/auth/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/send-otp", AuthController.sentOtp);
AuthRouter.post("/check-otp", AuthController.checkOtp);
AuthRouter.post("/logout", AuthController.logOut); // Assuming you have a logOut route

export default AuthRouter;

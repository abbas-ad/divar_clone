import autoBind from "auto-bind";
import { Request, Response, NextFunction } from "express";
import AuthService from "./auth.service";
import AuthMessages from "./auth.messages"; // Assuming you have AuthMessages imported
import { serviceType } from "../../types/authControllers.type"; // Assuming serviceType is defined somewhere
import cookiesName from "../../common/constant/cookies.enum"; // Assuming serviceType is defined somewhere

class AuthController {
  #service: serviceType;
  constructor() {
    autoBind(this);
    this.#service = AuthService;
  }
  // this controllers get the sent OTP fields and calling their service  the valut and return to data
  async sentOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { mobile }: any = req.body;

      const result = await this.#service.sentOtp(mobile);
      // Send a response to the client
      res.json({
        data: result.otp,
        message: AuthMessages.SendOtpSuccessFully,
      });
    } catch (error) {
      next(error); // Forward the error to the error handler middleware
    }
  }
  // this controllers get the CHECK OTP fields and calling their service  the valut and return to data
  async checkOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { mobile, code }: any = req.body;

      const token = await this.#service.checkOtp(mobile, code);
      res
        .cookie(cookiesName.accessToken, token, {
          httpOnly: true,
          secure: false,
        })
        .status(200)
        .json({
          message: AuthMessages.SendOtpSuccessFully,
        });
    } catch (error) {
      next(error);
    }
  }

  // this controllers handel the log out request
  async logOut(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie(cookiesName.accessToken).status(200).json({
        messages: AuthMessages.logOut,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

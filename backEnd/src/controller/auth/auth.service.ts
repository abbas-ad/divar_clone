import autoBind from "auto-bind";
import UserModel from "./../../model/user.model";
import { Model } from "mongoose";
import createHttpError from "http-errors";
import AuthMessages from "./auth.messages";
import GetNow from "../../utils/getNow";
import { randomInt } from "crypto";
import { userTypes } from "../../types/authControllers.type";
import dotEnv from "dotenv";
dotEnv.config();

import jwt from "jsonwebtoken";

class AuthService {
  #model: Model<userTypes>;
  
  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }
  // this [service]:  create the OTP
  async sentOtp(mobile: string) {
    // Get current time
    const now = GetNow();

    // Check if the user exists in the database
    let user = await this.#model.findOne({ mobile });

    // If the user does not exist, create a new user with an OTP
    if (!user) {
      const otp = {
        code: randomInt(1000, 9999),
        expiresIn: now + 1000 * 60 * 2, // OTP expires in 2 minutes
      };

      const newUser = await this.#model.create({ mobile, otp });
      return newUser; // Return the newly created user with OTP
    }

    // If user exists, check if OTP exists and is still valid
    if (user.otp && user?.otp?.expiresIn && user?.otp?.expiresIn > now) {
      // If OTP exists and is still valid, return an error and don't generate a new OTP
      throw new createHttpError.BadRequest(AuthMessages.codeAlreadyExist);
    }

    // If OTP is expired or doesn't exist, generate a new OTP
    const newOtp = {
      code: randomInt(1000, 9999),
      expiresIn: now + 1000 * 60 * 2, // OTP expires in 2 minutes
    };

    // Use set() to update the otp subdocument properly
    user.set("otp", newOtp);
    await user.save();

    return user; // Return the updated user with the new OTP
  }
  // this [service]:  check the OTP
  async checkOtp(mobile: string, code: string) {
    // get Now timing
    const now = GetNow();
    // check if user exist or not
    const user = await this.#model.findOne({ mobile });

    // this code check if user not exist return the erros
    if (!user) throw new createHttpError.NotFound(AuthMessages.userNotFound);
    // in this conditions we check token to expires or not
    if (user.otp.expiresIn && user.otp.expiresIn < now)
      throw new createHttpError.Unauthorized(AuthMessages.tokenExpires);
    // in this conitions we checked token its valida or not
    if (user.otp.code !== code)
      throw new createHttpError.Unauthorized(AuthMessages.tokenNotValid);
    // check if phone number not vereified change their status
    if (user.verifiedMobile == false) {
      user.verifiedMobile = true;
    }

    // Expire the OTP after successful use (set `otp` to null or empty object)
    const expireOtp = {
      code: undefined,
      expiresIn: 0,
    };

    // Use set() to update the otp subdocument properly
    user.set("otp", expireOtp);

    const accessToken = this.signToken({ mobile, id: user._id });
    user.accessToken = accessToken;
    // Save the user with updated fields
    await user.save();

    return accessToken;
  }
  // this methods Gentrate the Tokens
  signToken(payload: any) {
    return jwt.sign(
      payload,
      process?.env?.SECRET_KEY ??
        "asckxjahskdjhaskjdhlkasjhdlkajhxclquydliquyda",
      { expiresIn: "1y" }
    );
  }

  async logOut() {}
}

// export ass singilton desing pattern
export default new AuthService();

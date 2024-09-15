import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import authMessages from "../../messages/auth.messages";
import jwt from "jsonwebtoken";
import UserModel from "../../model/user.model";
import { userTypes } from "../../types/authControllers.type";
// Extending the Request interface to include 'user'
declare module "express-serve-static-core" {
  interface Request {
    user?: userTypes;
  }
}

const Authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // in this sections chek user have access_token or not -- its login or not
    const token = req.cookies.access_token;
    if (!token) throw new createHttpError.Unauthorized(authMessages.login);

    // varify Token data -- if its login verify this token
    const data: any = jwt.verify(
      token,
      process.env.SECRET_KEY ?? "asckxjahskdjhaskjdhlkasjhdlkajhxclquydliquyda"
    );

    if (typeof data === "object" && "id" in data) {
      const user = await UserModel.findById(data.id, {
        accessToken: 0,
        otp: 0,
        __v: 0,
        updatedAt: 0,
        verifiedMobile: 0,
      }).lean();
      if (!user)
        throw new createHttpError.Unauthorized(authMessages.notFoundAccount);
      req.user = user;
      return next();
    }
    throw new createHttpError.Unauthorized(authMessages.invalidToken);
  } catch (error) {
    next(error);
  }
};

export default Authorization;

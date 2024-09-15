import autoBind from "auto-bind";
import { Request, Response, NextFunction } from "express";
import UserService from "./user.service";

class UserController {
  #service: any;
  constructor() {
    autoBind(this);
    this.#service = UserService;
  }

  async whoami(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      return res.json({
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();

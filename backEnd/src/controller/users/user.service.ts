import autoBind from "auto-bind";
import UserModel from "./../../model/user.model";
import { Model } from "mongoose";
import { userTypes } from "../../types/authControllers.type";
import dotEnv from "dotenv";
dotEnv.config();

class UserService {
  #model: Model<userTypes>;

  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }
}

// export ass singilton desing pattern
export default new UserService();

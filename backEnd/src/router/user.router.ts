import { Router } from "express";
import userController from "../controller/users/user.controller";
import Authorization from "../common/guard/authorization.guard";

const UserRouter = Router();

UserRouter.post("/whoami", Authorization, userController.whoami);

export default UserRouter;

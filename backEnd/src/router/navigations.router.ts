import { Router } from "express";
import navigationController from "../controller/navigation/navigation.controller";

const NavigationRouter = Router();

// UserRouter.post("/whoami", Authorization, userController.whoami);
NavigationRouter.post("/", navigationController.create);
NavigationRouter.get("/", navigationController.find);

export default NavigationRouter;

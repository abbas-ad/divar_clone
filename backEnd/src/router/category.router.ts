import { Router } from "express";
import categoryController from "../controller/category/category.controller";

const CategoryRouter = Router();

// UserRouter.post("/whoami", Authorization, userController.whoami);
CategoryRouter.post("/", categoryController.create);
CategoryRouter.get("/", categoryController.find);

export default CategoryRouter;

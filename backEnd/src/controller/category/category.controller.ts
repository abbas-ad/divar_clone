import autoBind from "auto-bind";
import categoryService from "./category.service";
import { Request, Response, NextFunction } from "express";
import { CategoryBodeyRequest } from "../../types/categoryController.type";
import categoryMessages from "./category.messages";

class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = categoryService;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, icon, slug, parent }: CategoryBodeyRequest = req.body;

      await this.#service.create({ name, icon, slug, parent });

      return res.status(201).json({
        messages: categoryMessages.createCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async find(req: Request, res: Response, next: NextFunction) {
    console.log("GET->CATEGORY::CALLEDS");
    try {
      const categories = await this.#service.find();

      return res.json({
        categories,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();

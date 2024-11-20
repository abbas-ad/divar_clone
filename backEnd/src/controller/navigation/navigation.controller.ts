import autoBind from "auto-bind";
import { Request, Response, NextFunction } from "express";
import { CategoryBodeyRequest } from "../../types/categoryController.type";
import navigationsService from "./navigations.service";

class NavigationController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = navigationsService;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, icon, href } = req.body;
      const response = this.#service.create({ name, icon, href });
      console.log(response)
      return res.status(200).json({
        response
      });
    } catch (error) {
      next(error);
    }
  }

  async find(req: Request, res: Response, next: NextFunction) {}
}

export default new NavigationController();

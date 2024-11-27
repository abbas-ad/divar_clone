import autoBind from "auto-bind";
import CategoriesModel from "../../model/categories.model";

class UploadService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = CategoriesModel;
  }

  async create(categoryDto: any) {}
}

export default new UploadService();

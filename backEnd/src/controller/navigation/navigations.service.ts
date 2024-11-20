import autoBind from "auto-bind";
import { navigation } from "../../types/navigationController.type";
import NavigationModel from "../../model/navigation.model";

class NavigationService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = NavigationModel;
  }

  async create(navigationDto: any) {}

  async find() {}
}

export default new NavigationService();

import autoBind from "auto-bind";
import CategoriesModel from "../../model/categories.model";
import { Types, isValidObjectId } from "mongoose";
import createHttpError from "http-errors";
import categoryMessages from "./category.messages";
import slugify from "slugify";

class CategoryService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = CategoriesModel;
  }

  async create(categoryDto: any) {
    // If parent exists and is a valid ObjectId
    if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
      const existCategory = await this.checkExistById(categoryDto.parent);

      // Make sure existCategory.parent is an array (or fallback to an empty array if undefined)
      const parentIds = existCategory?.parent?.length
        ? existCategory.parent.map((id: string | number) => id.toString())
        : [];

      categoryDto.parent = [
        ...new Set(
          // Concatenate current parent ID with existing parent IDs
          [existCategory._id.toString(), ...parentIds].map(
            (id: string | number) => new Types.ObjectId(id)
          )
        ),
      ];
    }

    // Slug handling
    if (categoryDto?.slug) {
      categoryDto.slug = slugify(categoryDto.slug);
      await this.alreadyExistBySlug(categoryDto.slug);
    } else {
      categoryDto.slug = slugify(categoryDto.name);
    }

    // Create the category
    const category = await this.#model.create(categoryDto);
    return category;
  }

  async find() {
    return await this.#model.find({ parent: { $exists: false } });
  }

  async checkExistById(id: string | number) {
    const category = await this.#model.findById(id);
    if (!category)
      throw new createHttpError.NotFound(categoryMessages.categoryNotFound);
    return category;
  }

  async checkExistSlug(slug: string) {
    const category = await this.#model.findOne({ slug });
    if (!category)
      throw new createHttpError.NotFound(categoryMessages.alreadyExustCategory);
    return null;
  }

  async alreadyExistBySlug(slug: string) {
    const category = await this.#model.findOne({ slug });
    if (category)
      throw new createHttpError.NotFound(categoryMessages.alreadyExustCategory);
    return null;
  }
}

export default new CategoryService();

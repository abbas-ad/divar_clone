import { Schema, Types, model } from "mongoose";

const CategoriesSchema = new Schema<any>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    icon: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: "Category", required: false },
    parents: {
      type: [Types.ObjectId],
      ref: "Category",
      required: false,
      default: [],
    },
  },
  { virtuals: true, versionKey: false, id: false }
);

CategoriesSchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

// Create the model
const CategoriesModel = model<any>("category", CategoriesSchema);

export default CategoriesModel;

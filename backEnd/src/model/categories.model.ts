import { NextFunction } from "express";
import { Query, Schema, Types, model } from "mongoose";

const CategoriesSchema = new Schema<any>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    icon: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: "Category", required: false },
    parents: {
      type: [Types.ObjectId],
      required: false,
      default: [],
    },
  },
  { toJSON: { virtuals: true }, versionKey: false, id: false }
);

CategoriesSchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

function autoPopulate(this: Query<any, Document>, next: NextFunction) {
  this.populate([{ path: "children" }]);
  next();
}

(CategoriesSchema as any)
  .pre("find", autoPopulate)
  .pre("findOne", autoPopulate);

// Create the model
const CategoriesModel = model<any>("Category", CategoriesSchema);

export default CategoriesModel;

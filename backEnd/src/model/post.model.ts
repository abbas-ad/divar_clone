import { Schema, Types } from "mongoose";

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: Types.ObjectId, ref: "Category", required: true },
  provinces: { type: String, required: true },
  city: { type: String, required: true },
  distric: { type: String, required: true },
  coordinate: { type: [String], required: true },
  images: { type: [String], required: false, default: [] },
});

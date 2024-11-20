import { Schema, model } from "mongoose";
import { navigation } from "../types/navigationController.type";

// Define the NAVIGATION schema
const navigationSchema = new Schema<navigation>(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    href: { type: String, required: true },
  },
  { timestamps: true }
);

// Create the model
const NavigationModel = model<navigation>("navigation", navigationSchema);

export default NavigationModel;

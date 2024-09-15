import { Schema, model } from "mongoose";
import { otpTypes, userTypes } from "../types/authControllers.type";

// Define the userTypes interface that extends mongoose's Document

// Define the OTP schema
const OTPSchema = new Schema<otpTypes>({
  code: { type: String, required: false, default: undefined },
  expiresIn: { type: Number, required: false, default: 0 },
});

// Define the user schema
const userSchema = new Schema<userTypes>(
  {
    fullName: { type: String, required: false },
    mobile: { type: String, unique: true, required: true },
    otp: { type: OTPSchema, required: false },
    accessToken: { type: String },
    verifiedMobile: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

// Create the model
const UserModel = model<userTypes>("user", userSchema);

export default UserModel;

import { Document } from "mongoose";

interface userTypes extends Document {
  fullName: string;
  mobile: string;
  otp: otpTypes;
  accessToken: string;
  verifiedMobile: boolean;
}
interface otpTypes extends Document {
  code?: string;
  expiresIn?: number;
}

interface serviceType {
  sentOtp: (mobile: string) => Promise<userTypes>;
  checkOtp: (otp: string, mobile: string) => Promise<string>;
  logOut: () => void;
}

interface sentOtpType {
  mobile: string | null;
}

export { sentOtpType, serviceType, userTypes, otpTypes };

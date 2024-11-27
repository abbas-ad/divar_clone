import * as express from "express";
import { File } from "multer"; // Type of Multer files

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File; // برای یک فایل تکی
      files?: Express.Multer.File[]; // برای چندین فایل
    }
  }
}

import autoBind from "auto-bind";
const multer = require("multer");
const path = require("path");
import { Request, Response, NextFunction } from "express";
import uploadService from "./upload.service";

class UploadController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = uploadService;
  }

  async upload(req: Request, res: Response, next: NextFunction) {
    // تنظیمات Multer
    const storage = multer.diskStorage({
      destination: (req: Request, file: any, cb: any) => {
        cb(null, path.join(__dirname, "../../uploads"));
      },
      filename: (req: Request, file: any, cb: any) => {
        const uniqueName =
          Date.now() +
          "-" +
          Math.round(Math.random() * 1e9) +
          path.extname(file.originalname);
        cb(null, uniqueName);
      },
    });

    const upload = multer({
      storage: storage,
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req: Request, file: any, cb: any) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error("فرمت فایل پشتیبانی نمی‌شود."));
        }
      },
    });

    const singleUpload = upload.single("image"); // انتظار فایل تکی

    singleUpload(req, res, (err: any) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: "آپلود فایل الزامی است!" });
      }

      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      return res.status(200).json({
        message: "تصویر با موفقیت آپلود شد!",
        fileUrl: fileUrl,
      });
    });
  }
}

export default new UploadController();

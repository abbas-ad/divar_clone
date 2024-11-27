import { Router } from "express";
import Authorization from "../common/guard/authorization.guard";
import uploadController from "../controller/upload/upload.controller";

const UploadRouter = Router();

UploadRouter.post("/", uploadController.upload);

export default UploadRouter;

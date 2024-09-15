import { Application, NextFunction, Request, Response } from "express";

function NotFoundHandlers(app: Application) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
      messages: "not found Routes",
    });
  });
}

export default NotFoundHandlers;

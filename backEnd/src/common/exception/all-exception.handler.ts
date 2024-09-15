import { Application, NextFunction, Request, Response } from "express";

// Extend the Error interface to include additional fields like status and code
interface ExpressErrors extends Error {
  status?: number;
  statusCode?: number;
  code?: number;
}

function AllExceptionHandler(app: Application) {
  app.use(
    (err: ExpressErrors, req: Request, res: Response, next: NextFunction) => {
      let status = err?.status ?? err?.statusCode ?? err?.code;
      if (!status || isNaN(+status) || status > 511 || status < 200)
        status = 500;
      return res.status(status).json({
        messages: err?.message ?? err?.stack ?? "internal server Errors",
      });
    }
  );
}

export default AllExceptionHandler;

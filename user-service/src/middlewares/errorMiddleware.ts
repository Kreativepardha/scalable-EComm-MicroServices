// import { NextFunction, Request, Response } from "express";

import { NextFunction } from "express";
import { ZodError } from "zod";

// export const errorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: err.message,
//   });
// };

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction){
  console.error(err);

  if(err instanceof ZodError) {
    const formattedErrors = err.errors.map(e => ({
      path: e.path, message: e.message
    }))
    return res.status(400).json({
      error: "Validation Error", details: formattedErrors
    })
  }

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    error: message
  });
}
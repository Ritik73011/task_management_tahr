import { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Zod Validation Error
  if (err instanceof ZodError) {
    statusCode = 400;
    message = err.issues.map((issue) => issue.message).join(", ");
  }

  // Prisma Unique Constraint
  if (err.code === "P2002") {
    statusCode = 409;
    message = "Resource already exists.";
  }

  // Prisma Record Not Found
  if (err.code === "P2025") {
    statusCode = 404;
    message = "Resource not found.";
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired token.";
  }

  const error = new ApiError(statusCode, message);

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export { errorHandler };

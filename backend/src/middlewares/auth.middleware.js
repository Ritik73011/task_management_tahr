import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/jwt.js";

const auth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized. Token is missing.");
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyToken(token);

  req.user = decoded;

  next();
});

export default auth;

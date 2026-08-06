import authService from "./auth.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.validatedData.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully.", result));
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.validatedData.body);

  return res
    .status(200)
    .json(new ApiResponse(200, "Login successful.", result));
});
const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user.user_id);

  return res
    .status(200)
    .json(new ApiResponse(200, "User profile fetched successfully.", user));
});

export default {
  register,
  login,
  getMe,
};

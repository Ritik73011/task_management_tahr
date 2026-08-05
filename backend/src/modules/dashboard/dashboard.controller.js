import dashboardService from "./dashboard.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await dashboardService.getDashboard();

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Dashboard data fetched successfully.", dashboard),
    );
});

export default {
  getDashboard,
};

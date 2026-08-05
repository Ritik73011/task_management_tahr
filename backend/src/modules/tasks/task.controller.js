import taskService from "./task.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.body, req.user.user_id);

  return res
    .status(201)
    .json(new ApiResponse(201, "Task created successfully.", task));
});

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.getAllTasks(req.query);

  return res
    .status(200)
    .json(new ApiResponse(200, "Tasks fetched successfully.", tasks));
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(Number(req.params.taskId));

  return res
    .status(200)
    .json(new ApiResponse(200, "Task fetched successfully.", task));
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(
    Number(req.params.taskId),
    req.body,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Task updated successfully.", task));
});

const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(Number(req.params.taskId));

  return res
    .status(200)
    .json(new ApiResponse(200, "Task deleted successfully."));
});

export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};

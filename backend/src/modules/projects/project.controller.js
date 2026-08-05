import projectService from "./project.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.validatedData.body);

  return res
    .status(201)
    .json(new ApiResponse(201, "Project created successfully.", project));
});

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await projectService.getAllProjects(req.validatedData.query);

  return res
    .status(200)
    .json(new ApiResponse(200, "Projects fetched successfully.", projects));
});

const getProjectById = asyncHandler(async (req, res) => {
  const project = await projectService.getProjectById(
    Number(req.validatedData.params.projectId),
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Project fetched successfully.", project));
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject(
    Number(req.validatedData.params.projectId),
    req.body,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Project updated successfully.", project));
});

const deleteProject = asyncHandler(async (req, res) => {
  await projectService.deleteProject(
    Number(req.validatedData.params.projectId),
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Project deleted successfully."));
});

export default {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};

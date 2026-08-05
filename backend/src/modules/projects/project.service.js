import prisma from "../../config/db.js";
import ApiError from "../../utils/ApiError.js";

const createProject = async ({ name, description, status }) => {
  const project = await prisma.project.create({
    data: {
      name,
      description,
      status,
    },
  });

  return project;
};

const getAllProjects = async () => {
  const projects = await prisma.project.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return projects;
};

const getProjectById = async (projectId) => {
  const project = await prisma.project.findUnique({
    where: {
      project_id: projectId,
    },
  });

  if (!project) {
    throw new ApiError(404, "Project not found.");
  }

  return project;
};

const updateProject = async (projectId, { name, description, status }) => {
  const existingProject = await prisma.project.findUnique({
    where: {
      project_id: projectId,
    },
  });

  if (!existingProject) {
    throw new ApiError(404, "Project not found.");
  }

  const updatedProject = await prisma.project.update({
    where: {
      project_id: projectId,
    },
    data: {
      name,
      description,
      status,
    },
  });

  return updatedProject;
};

const deleteProject = async (projectId) => {
  const existingProject = await prisma.project.findUnique({
    where: {
      project_id: projectId,
    },
  });

  if (!existingProject) {
    throw new ApiError(404, "Project not found.");
  }

  await prisma.project.delete({
    where: {
      project_id: projectId,
    },
  });
};

export default {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};

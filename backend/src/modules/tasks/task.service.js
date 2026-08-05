import prisma from "../../config/db.js";
import ApiError from "../../utils/ApiError.js";

const createTask = async (taskData, userId) => {
  const project = await prisma.project.findUnique({
    where: {
      project_id: taskData.project_id,
    },
  });

  if (!project) {
    throw new ApiError(404, "Project not found.");
  }

  const task = await prisma.task.create({
    data: {
      ...taskData,
      user_id: userId,
    },
  });

  return task;
};

const getAllTasks = async ({ status, priority, sort }) => {
  const where = {};

  if (status) {
    where.status = status;
  }

  if (priority) {
    where.priority = priority;
  }

  const tasks = await prisma.task.findMany({
    where,
    orderBy: {
      due_date: sort === "desc" ? "desc" : "asc",
    },
    include: {
      project: {
        select: {
          project_id: true,
          name: true,
        },
      },
    },
  });

  return tasks;
};

const getTaskById = async (taskId) => {
  const task = await prisma.task.findUnique({
    where: {
      task_id: taskId,
    },
    include: {
      project: {
        select: {
          project_id: true,
          name: true,
        },
      },
    },
  });

  if (!task) {
    throw new ApiError(404, "Task not found.");
  }

  return task;
};

const updateTask = async (taskId, taskData) => {
  const existingTask = await prisma.task.findUnique({
    where: {
      task_id: taskId,
    },
  });

  if (!existingTask) {
    throw new ApiError(404, "Task not found.");
  }

  if (taskData.project_id) {
    const project = await prisma.project.findUnique({
      where: {
        project_id: taskData.project_id,
      },
    });

    if (!project) {
      throw new ApiError(404, "Project not found.");
    }
  }

  const updatedTask = await prisma.task.update({
    where: {
      task_id: taskId,
    },
    data: taskData,
  });

  return updatedTask;
};

const deleteTask = async (taskId) => {
  const existingTask = await prisma.task.findUnique({
    where: {
      task_id: taskId,
    },
  });

  if (!existingTask) {
    throw new ApiError(404, "Task not found.");
  }

  await prisma.task.delete({
    where: {
      task_id: taskId,
    },
  });
};

export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};

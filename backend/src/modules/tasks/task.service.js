import prisma from "../../config/db.js";
import ApiError from "../../utils/ApiError.js";
import getPagination from "../../utils/pagination.js";

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

const getAllTasks = async ({ status, priority, sort, page, limit }) => {
  const where = {};

  if (status) where.status = status;
  if (priority) where.priority = priority;

  const { skip, take } = getPagination(page, limit);

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip,
      take,
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
    }),
    prisma.task.count({ where }),
  ]);

  return {
    tasks,
    pagination: {
      total,
      page: Number(page) || 1,
      limit: take,
      totalPages: Math.ceil(total / take),
    },
  };
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

import prisma from "../../config/db.js";

const getDashboard = async () => {
  const [totalProjects, totalTasks, completedTasks, pendingTasks] =
    await Promise.all([
      prisma.project.count(),

      prisma.task.count(),

      prisma.task.count({
        where: {
          status: "COMPLETED",
        },
      }),

      prisma.task.count({
        where: {
          status: {
            not: "COMPLETED",
          },
        },
      }),
    ]);

  return {
    totalProjects,
    totalTasks,
    completedTasks,
    pendingTasks,
  };
};

export default {
  getDashboard,
};

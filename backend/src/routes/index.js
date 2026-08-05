import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import projectRoutes from "../modules/projects/project.routes.js";
import taskRoutes from "../modules/tasks/task.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);

// Health Check
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Management API is running.",
  });
});

export default router;

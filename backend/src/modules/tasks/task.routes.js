import { Router } from "express";

import taskController from "./task.controller.js";
import auth from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";

import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
  getTasksSchema,
} from "./task.validation.js";

const router = Router();

router.use(auth);

router.post("/", validate(createTaskSchema), taskController.createTask);

router.get("/", validate(getTasksSchema), taskController.getAllTasks);

router.get("/:taskId", validate(taskIdSchema), taskController.getTaskById);

router.put("/:taskId", validate(updateTaskSchema), taskController.updateTask);

router.delete("/:taskId", validate(taskIdSchema), taskController.deleteTask);

export default router;

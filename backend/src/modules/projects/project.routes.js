import { Router } from "express";

import projectController from "./project.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import auth from "../../middlewares/auth.middleware.js";

import {
  createProjectSchema,
  updateProjectSchema,
  projectIdSchema,
} from "./project.validation.js";

const router = Router();

router.use(auth);

router.post(
  "/",
  validate(createProjectSchema),
  projectController.createProject,
);

router.get("/", projectController.getAllProjects);

router.get(
  "/:projectId",
  validate(projectIdSchema),
  projectController.getProjectById,
);

router.put(
  "/:projectId",
  validate(updateProjectSchema),
  projectController.updateProject,
);

router.delete(
  "/:projectId",
  validate(projectIdSchema),
  projectController.deleteProject,
);

export default router;

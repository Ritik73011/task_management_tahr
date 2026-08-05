import { Router } from "express";

import dashboardController from "./dashboard.controller.js";
import auth from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", auth, dashboardController.getDashboard);

export default router;

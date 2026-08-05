import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";

const router = Router();

router.use("/auth", authRoutes);

// Health Check
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Management API is running.",
  });
});

export default router;

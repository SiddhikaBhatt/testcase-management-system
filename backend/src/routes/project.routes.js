import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  createProjectHandler,
  getProjectsHandler,
  updateProjectHandler
} from "../controllers/project.controller.js";

const router = express.Router();

// View projects → ALL roles
router.get("/", authenticate, getProjectsHandler);

// Create project → admin, test-lead
router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "test-lead"),
  createProjectHandler
);

// Update project → admin, test-lead
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin", "test-lead"),
  updateProjectHandler
);

export default router;

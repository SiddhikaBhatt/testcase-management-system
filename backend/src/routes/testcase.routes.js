import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  createTestCaseHandler,
  getTestCasesHandler,
  deleteTestCaseHandler,
} from "../controllers/testcase.controller.js";

const router = express.Router();

// Get test cases → all roles
router.get(
  "/project/:projectId",
  authenticate,
  getTestCasesHandler
);

// Create test case → admin, test-lead
router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "test-lead"),
  createTestCaseHandler
);

// Delete test case → admin only
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("admin"),
  deleteTestCaseHandler
);

export default router;

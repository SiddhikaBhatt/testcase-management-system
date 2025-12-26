import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  executeTestCaseHandler,
  getExecutionsHandler,
} from "../controllers/testExecution.controller.js";

const router = express.Router();

// Execute test case → tester, admin, test-lead
router.post(
  "/",
  authenticate,
  authorizeRoles("tester", "admin", "test-lead"),
  executeTestCaseHandler
);

// View executions → all roles
router.get(
  "/testcase/:testcaseId",
  authenticate,
  getExecutionsHandler
);

export default router;


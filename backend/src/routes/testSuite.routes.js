import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  createTestSuiteHandler,
  getSuitesHandler,
  addTestCaseHandler,
  getSuiteTestCasesHandler,
} from "../controllers/testSuite.controller.js";

const router = express.Router();

// Create suite → admin, test-lead
router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "test-lead"),
  createTestSuiteHandler
);

// Get suites by project
router.get(
  "/project/:projectId",
  authenticate,
  getSuitesHandler
);

// Add test case to suite
router.post(
  "/add-testcase",
  authenticate,
  authorizeRoles("admin", "test-lead"),
  addTestCaseHandler
);

// Get test cases in suite
router.get(
  "/:suiteId/testcases",
  authenticate,
  getSuiteTestCasesHandler
);

export default router;

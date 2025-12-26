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
router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "test-lead"),
  createTestSuiteHandler
);
router.get(
  "/project/:projectId",
  authenticate,
  getSuitesHandler
);
router.post(
  "/add-testcase",
  authenticate,
  authorizeRoles("admin", "test-lead"),
  addTestCaseHandler
);
router.get(
  "/:suiteId/testcases",
  authenticate,
  getSuiteTestCasesHandler
);

export default router;

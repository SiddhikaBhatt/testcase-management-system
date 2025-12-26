import {
  executeTestCase,
  getExecutionsByTestCase,
} from "../models/testExecution.model.js";

// Execute test case
export const executeTestCaseHandler = async (req, res) => {
  try {
    const execution = await executeTestCase({
      testcase_id: req.body.testcase_id,
      executed_by: req.user.id,
      status: req.body.status,
      comments: req.body.comments,
    });

    res.status(201).json(execution);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get executions
export const getExecutionsHandler = async (req, res) => {
  try {
    const executions = await getExecutionsByTestCase(req.params.testcaseId);
    res.json(executions);
  } catch {
    res.status(500).json({ message: "Failed to fetch executions" });
  }
};

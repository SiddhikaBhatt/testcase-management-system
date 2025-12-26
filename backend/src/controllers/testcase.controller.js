import {
  createTestCase,
  getTestCasesByProject,
  deleteTestCase,
} from "../models/testcase.model.js";

// CREATE
export const createTestCaseHandler = async (req, res) => {
  try {
    const testCase = await createTestCase({
      ...req.body,
      created_by: req.user.id,
    });
    res.status(201).json(testCase);
  } catch {
    res.status(500).json({ message: "Failed to create test case" });
  }
};

// READ (by project)
export const getTestCasesHandler = async (req, res) => {
  try {
    const cases = await getTestCasesByProject(req.params.projectId);
    res.json(cases);
  } catch {
    res.status(500).json({ message: "Failed to fetch test cases" });
  }
};

// DELETE (admin only)
export const deleteTestCaseHandler = async (req, res) => {
  try {
    await deleteTestCase(req.params.id);
    res.json({ message: "Test case deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete test case" });
  }
};

import {
  createTestSuite,
  getSuitesByProject,
  addTestCaseToSuite,
  getTestCasesBySuite,
} from "../models/testsuite.model.js";

export const createTestSuiteHandler = async (req, res) => {
  try {
    const suite = await createTestSuite({
      ...req.body,
      created_by: req.user.id,
    });
    res.status(201).json(suite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSuitesHandler = async (req, res) => {
  try {
    const suites = await getSuitesByProject(req.params.projectId);
    res.json(suites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addTestCaseHandler = async (req, res) => {
  try {
    await addTestCaseToSuite(req.body.suite_id, req.body.testcase_id);
    res.json({ message: "Test case added to suite" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSuiteTestCasesHandler = async (req, res) => {
  try {
    const cases = await getTestCasesBySuite(req.params.suiteId);
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

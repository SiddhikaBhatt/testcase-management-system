import {
  createTestSuite,
  getSuitesByProject,
  addTestCaseToSuite,
  getTestCasesBySuite,
} from "../models/testSuite.model.js";

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
  const suites = await getSuitesByProject(req.params.projectId);
  res.json(suites);
};

export const addTestCaseHandler = async (req, res) => {
  await addTestCaseToSuite(req.body.suite_id, req.body.testcase_id);
  res.json({ message: "Test case added to suite" });
};

export const getSuiteTestCasesHandler = async (req, res) => {
  const cases = await getTestCasesBySuite(req.params.suiteId);
  res.json(cases);
};

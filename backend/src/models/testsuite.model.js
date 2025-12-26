import pool from "../config/db.js";

export const createTestSuite = async ({ name, description, project_id, created_by }) => {
  const { rows } = await pool.query(
    `INSERT INTO test_suites (name, description, project_id, created_by)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [name, description, project_id, created_by]
  );
  return rows[0];
};

export const getSuitesByProject = async (projectId) => {
  const { rows } = await pool.query(
    `SELECT * FROM test_suites WHERE project_id = $1`,
    [projectId]
  );
  return rows;
};

export const addTestCaseToSuite = async (suiteId, testcaseId) => {
  await pool.query(
    `INSERT INTO test_suite_cases (suite_id, testcase_id)
     VALUES ($1,$2)
     ON CONFLICT DO NOTHING`,
    [suiteId, testcaseId]
  );
};

export const getTestCasesBySuite = async (suiteId) => {
  const { rows } = await pool.query(
    `SELECT tc.*
     FROM test_cases tc
     JOIN test_suite_cases tsc ON tc.id = tsc.testcase_id
     WHERE tsc.suite_id = $1`,
    [suiteId]
  );
  return rows;
};

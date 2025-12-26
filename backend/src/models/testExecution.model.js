import pool from "../config/db.js";

export const executeTestCase = async ({
  testcase_id,
  executed_by,
  status,
  comments,
}) => {
  const { rows } = await pool.query(
    `INSERT INTO test_executions
     (testcase_id, executed_by, status, comments)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [testcase_id, executed_by, status, comments]
  );

  return rows[0];
};

export const getExecutionsByTestCase = async (testcaseId) => {
  const { rows } = await pool.query(
    `SELECT te.*, u.name AS executed_by_name
     FROM test_executions te
     LEFT JOIN users u ON te.executed_by = u.id
     WHERE testcase_id = $1
     ORDER BY executed_at DESC`,
    [testcaseId]
  );

  return rows;
};

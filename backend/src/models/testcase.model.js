import pool from "../config/db.js";

export const createTestCase = async (data) => {
  const {
    title,
    description,
    priority,
    type,
    pre_conditions,
    post_conditions,
    project_id,
    created_by,
  } = data;

  const { rows } = await pool.query(
    `INSERT INTO test_cases
     (title, description, priority, type, pre_conditions, post_conditions, project_id, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [
      title,
      description,
      priority,
      type,
      pre_conditions,
      post_conditions,
      project_id,
      created_by,
    ]
  );

  return rows[0];
};

export const getTestCasesByProject = async (projectId) => {
  const { rows } = await pool.query(
    `SELECT *
     FROM test_cases
     WHERE project_id = $1
     ORDER BY created_at DESC`,
    [projectId]
  );

  return rows;
};
export const deleteTestCase = async (id) => {
  await pool.query(
    `DELETE FROM test_cases WHERE id = $1`,
    [id]
  );
};


import pool from "../config/db.js";

export const createProject = async ({ name, description, version, status, createdBy }) => {
  const { rows } = await pool.query(
    `INSERT INTO projects (name, description, version, status, created_by)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, description, version, status, createdBy]
  );
  return rows[0];
};

export const getAllProjects = async () => {
  const { rows } = await pool.query(
    `SELECT p.*, u.name AS created_by_name
     FROM projects p
     LEFT JOIN users u ON p.created_by = u.id
     ORDER BY p.created_at DESC`
  );
  return rows;
};

export const updateProject = async (id, { name, description, version, status }) => {
  const { rows } = await pool.query(
    `UPDATE projects
     SET name=$1, description=$2, version=$3, status=$4
     WHERE id=$5
     RETURNING *`,
    [name, description, version, status, id]
  );
  return rows[0];
};

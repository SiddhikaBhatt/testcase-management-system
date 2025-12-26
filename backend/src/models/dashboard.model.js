import pool from "../config/db.js";

export const getDashboardStats = async () => {
  const projects = await pool.query(`SELECT COUNT(*) FROM projects`);
  const testCases = await pool.query(`SELECT COUNT(*) FROM test_cases`);
  const executions = await pool.query(`SELECT COUNT(*) FROM test_executions`);

  const executionStatus = await pool.query(`
    SELECT status, COUNT(*) 
    FROM test_executions
    GROUP BY status
  `);

  return {
    totalProjects: projects.rows[0].count,
    totalTestCases: testCases.rows[0].count,
    totalExecutions: executions.rows[0].count,
    executionStatus: executionStatus.rows
  };
};

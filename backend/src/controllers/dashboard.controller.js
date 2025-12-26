import pool from "../config/db.js";

export const getDashboardStats = async (req, res) => {
  try {
    const projects = await pool.query("SELECT COUNT(*) FROM projects");
    const testcases = await pool.query("SELECT COUNT(*) FROM test_cases");
    const executions = await pool.query("SELECT COUNT(*) FROM test_executions");

    const status = await pool.query(`
      SELECT status, COUNT(*)
      FROM test_executions
      GROUP BY status
    `);

    const priorities = await pool.query(`
      SELECT priority, COUNT(*)
      FROM test_cases
      GROUP BY priority
    `);

    const response = {
      totalProjects: projects.rows[0].count,
      totalTestCases: testcases.rows[0].count,
      totalExecutions: executions.rows[0].count,
      executionStatus: status.rows,
      testCasePriorities: priorities.rows,
    };

    res.json(response);
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};

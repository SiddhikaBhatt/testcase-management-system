import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import testcaseRoutes from "./routes/testcase.routes.js";
import testExecutionRoutes from "./routes/testExecution.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import testsuiteRoutes from "./routes/testsuite.routes.js";

import { authenticate } from "./middleware/auth.middleware.js";
import { authorizeRoles } from "./middleware/role.middleware.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);

app.get(
  "/api/admin-test",
  authenticate,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Admin access confirmed" });
  }
);

app.use("/api/projects", projectRoutes);
app.use("/api/testcases", testcaseRoutes);
app.use("/api/executions", testExecutionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/testsuites", testsuiteRoutes);

export default app;

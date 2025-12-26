import { useEffect, useState } from "react";
import api from "../api/axios";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ["#00C49F", "#FF8042", "#FFBB28"];

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Dashboard</h2>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>Welcome, {user.email} ({user.role})</p>

      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", minWidth: "150px" }}>
          <h3>Total Projects</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{stats.totalProjects}</p>
        </div>
        <div style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", minWidth: "150px" }}>
          <h3>Total Test Cases</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{stats.totalTestCases}</p>
        </div>
        <div style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", minWidth: "150px" }}>
          <h3>Total Executions</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{stats.totalExecutions}</p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ textAlign: "center" }}>
          <h3>Execution Status</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={stats.executionStatus}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {stats.executionStatus.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3>Test Case Priorities</h3>
          <BarChart width={400} height={300} data={stats.testCasePriorities}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="priority" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <button 
          onClick={() => window.location.href="/projects"}
          style={{ 
            padding: "10px 20px", 
            margin: "0 10px", 
            backgroundColor: "#646cff", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer" 
          }}
        >
          Go to Projects
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          style={{ 
            padding: "10px 20px", 
            margin: "0 10px", 
            backgroundColor: "#dc3545", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer" 
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function TestSuites() {
  const { projectId } = useParams();
  const [suites, setSuites] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuites();
  }, []);

  const fetchSuites = async () => {
    const res = await api.get(`/testsuites/project/${projectId}`);
    setSuites(res.data);
  };

  const createSuite = async (e) => {
    e.preventDefault();
    await api.post("/testsuites", {
      name,
      project_id: projectId,
    });
    setName("");
    fetchSuites();
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const canManageSuites = user.role === "admin" || user.role === "test-lead";

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Test Suites for Project {projectId}</h2>

      <button 
        onClick={() => navigate(`/projects/${projectId}`)}
        style={{ 
          padding: "10px 20px", 
          backgroundColor: "#6c757d", 
          color: "white", 
          border: "none", 
          borderRadius: "4px", 
          cursor: "pointer", 
          marginBottom: "20px" 
        }}
      >
        Back to Test Cases
      </button>

      {canManageSuites && (
        <div style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h3>Create New Test Suite</h3>
          <form onSubmit={createSuite} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              placeholder="Suite name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
              required
            />
            <button 
              type="submit"
              style={{ 
                padding: "10px 20px", 
                backgroundColor: "#28a745", 
                color: "white", 
                border: "none", 
                borderRadius: "4px", 
                cursor: "pointer" 
              }}
            >
              Create Suite
            </button>
          </form>
        </div>
      )}

      <hr />

      <div>
        <h3>Existing Test Suites</h3>
        {suites.length === 0 ? (
          <p>No test suites yet.</p>
        ) : (
          suites.map((s) => (
            <div key={s.id} style={{ 
              marginBottom: "10px", 
              padding: "10px", 
              border: "1px solid #ccc", 
              borderRadius: "4px" 
            }}>
              <b>{s.name}</b>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
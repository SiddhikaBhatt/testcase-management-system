import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const createProject = async (e) => {
    e.preventDefault();
    await api.post("/projects", {
      name,
      description,
      version: "v1.0",
      status: "Active",
    });
    setName("");
    setDescription("");
    fetchProjects();
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const canCreateProject = user.role === "admin" || user.role === "test-lead";

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Projects</h2>

      {canCreateProject && (
        <div style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h3>Create New Project</h3>
          <form onSubmit={createProject} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
              required
            />
            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
            <button 
              type="submit"
              style={{ 
                padding: "10px", 
                backgroundColor: "#28a745", 
                color: "white", 
                border: "none", 
                borderRadius: "4px", 
                cursor: "pointer" 
              }}
            >
              Create Project
            </button>
          </form>
        </div>
      )}

      <hr />

      <div>
        <h3>Existing Projects</h3>
        {projects.map((p) => (
          <div key={p.id} style={{ 
            marginBottom: "15px", 
            padding: "15px", 
            border: "1px solid #ccc", 
            borderRadius: "8px", 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center" 
          }}>
            <div>
              <b>{p.name}</b>
              <p>{p.description}</p>
            </div>
            <div>
              <button 
                onClick={() => navigate(`/projects/${p.id}`)}
                style={{ 
                  padding: "8px 16px", 
                  marginRight: "10px", 
                  backgroundColor: "#007bff", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "4px", 
                  cursor: "pointer" 
                }}
              >
                View Test Cases
              </button>
              <button 
                onClick={() => navigate(`/projects/${p.id}/testsuites`)}
                style={{ 
                  padding: "8px 16px", 
                  backgroundColor: "#6c757d", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "4px", 
                  cursor: "pointer" 
                }}
              >
                Manage Test Suites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

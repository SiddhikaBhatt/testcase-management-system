import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function TestCases() {
  const { projectId } = useParams();
  const [testcases, setTestcases] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTestCases();
  }, []);

  const fetchTestCases = async () => {
    const res = await api.get(`/testcases/project/${projectId}`);
    setTestcases(res.data);
  };

  const createTestCase = async (e) => {
    e.preventDefault();
    await api.post("/testcases", {
      title,
      project_id: projectId,
      priority: "High",
      type: "Functional",
      status: "Active",
    });
    setTitle("");
    fetchTestCases();
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const canCreateTestCase = user.role !== "read-only";

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Test Cases for Project {projectId}</h2>

      {canCreateTestCase && (
        <div style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h3>Add New Test Case</h3>
          <form onSubmit={createTestCase} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              placeholder="Test case title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              Add
            </button>
          </form>
        </div>
      )}

      <hr />

      <div>
        <h3>Existing Test Cases</h3>
        {testcases.length === 0 ? (
          <p>No test cases yet.</p>
        ) : (
          testcases.map((tc) => (
            <div key={tc.id} style={{ 
              marginBottom: "10px", 
              padding: "10px", 
              border: "1px solid #ccc", 
              borderRadius: "4px", 
              display: "flex", 
              justifyContent: "space-between" 
            }}>
              <span>{tc.title} <small>({tc.priority})</small></span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

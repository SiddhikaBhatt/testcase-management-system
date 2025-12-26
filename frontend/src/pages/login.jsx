import { useState } from "react";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login clicked");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Login response:", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login failed FULL ERROR:", err);

      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error message:", err.message);
      }

      alert("Login failed. Check console.");
    }
  };

  return (
    <div style={{ 
      maxWidth: "400px", 
      margin: "100px auto", 
      padding: "20px", 
      border: "1px solid #ccc", 
      borderRadius: "8px", 
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)" 
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
        <input
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ 
            padding: "10px", 
            marginBottom: "10px", 
            border: "1px solid #ccc", 
            borderRadius: "4px", 
            fontSize: "16px" 
          }}
          required
        />

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ 
            padding: "10px", 
            marginBottom: "20px", 
            border: "1px solid #ccc", 
            borderRadius: "4px", 
            fontSize: "16px" 
          }}
          required
        />

        <button 
          type="submit" 
          style={{ 
            padding: "10px", 
            backgroundColor: "#646cff", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            fontSize: "16px", 
            cursor: "pointer" 
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

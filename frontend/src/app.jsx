import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import TestCases from "./pages/TestCases";
import TestSuites from "./pages/TestSuites";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<TestCases />} />
        <Route path="/projects/:projectId/testsuites" element={<TestSuites />} />
      </Routes>
    </BrowserRouter>
  );
}

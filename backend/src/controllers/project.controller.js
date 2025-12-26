import {
  createProject,
  getAllProjects,
  updateProject
} from "../models/project.model.js";

// CREATE PROJECT
export const createProjectHandler = async (req, res) => {
  try {
    const project = await createProject({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to create project" });
  }
};

// GET ALL PROJECTS
export const getProjectsHandler = async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

// UPDATE PROJECT
export const updateProjectHandler = async (req, res) => {
  try {
    const updated = await updateProject(req.params.id, req.body);
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Failed to update project" });
  }
};

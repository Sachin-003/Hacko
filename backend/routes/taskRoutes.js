const express = require("express");
const router = express.Router();
const { createTask, getProjectTasks, updateTaskStatus, deleteTask, getYourTasks } = require("../controllers/taskController");

// Create a task
router.post("/", createTask);

// Get all tasks for a project
router.get("/:projectId", getProjectTasks);

// Update task status
router.put("/:taskId", updateTaskStatus);

// Delete a task
router.delete("/:taskId", deleteTask);
router.get("/task/assignedTo/:userId", getYourTasks);
module.exports = router;

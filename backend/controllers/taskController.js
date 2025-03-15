const Task = require("../models/taskModel");


exports.createTask = async (req, res) => {
    try {
        const { projectId, title, description, assigned_by, assigned_to } = req.body;
        
        if (!projectId || !title || !assigned_by || !assigned_to) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const task = await Task.create({ projectId, title, description, assigned_by, assigned_to });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error: error.message });
    }
};

exports.getProjectTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await Task.find({ projectId }).populate("assigned_by assigned_to", "name email");
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};


exports.updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        if (!["Pending", "In Progress", "Completed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error: error.message });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }

};

exports.getYourTasks = async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ assigned_to: userId });

        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error Getting Your Tasks", error: err.message });
    }
};

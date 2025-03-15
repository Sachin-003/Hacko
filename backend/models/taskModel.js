const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        assigned_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        assigned_to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Task", taskSchema);

// controllers/projectController.js
const Project = require('../models/projectModel'); // Assuming Project model is here
const { v4: uuidv4 } = require("uuid");

// Controller function for getting all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// Controller function for getting a project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

// Controller function for creating a new project
const createProject = async (req, res) => {
  try {
    const { title, description, owner , skills } = req.body;
    const chatroomId = uuidv4();
    const newProject = new Project({ title, description, owner, skills, chatroomId });
    await newProject.save();
    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

// Controller function for updating a project
const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

// Controller function for deleting a project
const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

const getNewProjects = async(req,res)=>{
  const { userId } = req.params;

  try{
    const projects = await Project.find({
      owner: { $ne: userId }, 
      members: { $nin: [userId] }, 
      requests:{$nin: [userId]},
    });

    console.log(projects);

    res.status(200).json({
      success: true,
      data: projects,
    });
  }
  catch (error) {
    
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the projects.",
      error: error.message,
    });
  }

};

const updateRequests = async (req, res) => {
  const { projectId } = req.params;  // Fix: Rename projectid to projectId
  const { userId } = req.body;

  try {
    const updatedRequest = await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { requests: userId } },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Request updated successfully", project: updatedRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update request" });
  }
};

const remove_from_requests = async(req,res) =>{
  const { projectId } = req.params;  // Fix: Rename projectid to projectId
  const { userId } = req.body;

  try {
    const updatedRequest = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { requests: userId } },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Request updated successfully", project: updatedRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update request" });
  }

}

const getMyProjects = async(req,res)=>{
  const {userId} = req.params;
  try{
    const projects = await Project.find(
      {
       $or: [
        {owner: userId},
        {members : {$in:userId}}
       ] 
      }
    );
    if(!projects){
      return res.status(404).json({error: "No projects found"});
    }
    res.status(200).json(projects);
  }
  catch(err){
    console.error(err);
  }
};

const add_members = async (req, res) => {
  const { projectId } = req.params;  // Extract projectId from params
  const { member_Id } = req.body;  // Extract member_Id from body

  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { members: member_Id } },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Member added successfully", project });
    console.log("Received Project ID:", req.params.project_id);
    console.log("Received Member ID:", req.body.member_Id);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add member" });
  }
};

const remove_member = async (req, res) => {
  const { projectId } = req.params;
  const { member_Id} = req.body;

  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { members: member_Id } },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Member removed successfully", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove member" });
  }
};





module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getNewProjects,
  updateRequests,
  getMyProjects,
  remove_from_requests,
  add_members,
  remove_member,
};

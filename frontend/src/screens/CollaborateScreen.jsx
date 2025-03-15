import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import axios from "axios";
import { Code, Pocket, User, PlusCircle } from "react-feather";

export default function CollaborateScreen() {
  const [ownerId, setOwnerId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ownerNames, setOwnerNames] = useState({}); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setOwnerId(decodedToken.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const fetchProjects = async () => {
    if (!ownerId) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/projects/user/${ownerId}`);
      setProjects(response.data.data);
    } catch (err) {
      setError("Failed to fetch projects");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [ownerId]);

  useEffect(() => {
    const fetchProjectOwnerDetails = async (projectOwnerId) => {
      if (!ownerId) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${projectOwnerId}`);
        setOwnerNames((prevNames) => ({
          ...prevNames,
          [projectOwnerId]: response.data.name, 
        }));
      } catch (err) {
        console.error(err);
      }
    };

    projects.forEach((project) => {
      if (project.owner && !ownerNames[project.owner]) {
        fetchProjectOwnerDetails(project.owner);
      }
    });
  }, [projects, ownerId]);

  const projectJoinRequest = async (recipient, sender, project) => {
    try {
      await axios.post("http://localhost:5000/api/notifications", {
        recipient, 
        sender,
        type: "Join Request",
        project
      });
    } catch (err) {
      console.error("Error sending join request:", err);
    }
  };

  const updaterequests = async (projectId) => {
    if (!ownerId || !projectId) return;
    try {
      await axios.put(`http://localhost:5000/api/projects/${projectId}/request`, {
        userId: ownerId,
      });
    } catch (err) {
      console.error(err);
    }
  };
  const clipDescription = (description) => {
    const n = description.length;
    if(n>=40){
      return description.slice(0,40)+".......";
    }
    else{
      return description;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl text-cyan-600 font-bold mb-4">Collaborate on Projects</h1>
      {loading && <p className="text-cyan-400">Loading projects...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-cyan-500 p-5 rounded-xl shadow-md transition-transform transform hover:scale-105">
            <div className="text-lg font-semibold mb-3 flex items-center text-white">
              <Code className="mr-2" /> {project.title}
            </div>
            <div className="text-sm mb-3 flex items-center text-cyan-200">
              <Pocket className="mr-2" /> {clipDescription(project.description)}
            </div>
            <div className="text-sm mb-4 flex items-center text-cyan-300">
              <User className="mr-2" /> {ownerNames[project.owner] || "Loading..."}
            </div>
            <button 
              onClick={async () => {
                await projectJoinRequest(project.owner, ownerId, project._id);
                await updaterequests(project._id);
                fetchProjects();
              }}
              className="flex items-center justify-center w-full bg-white text-cyan-700 font-semibold rounded-lg p-3 transition-all hover:bg-cyan-100"
            >
              Join <PlusCircle className="ml-2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
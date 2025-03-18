import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import axios from "axios";
import { Code, Pocket, User, LogOut, Eye } from "react-feather";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
export default function YourProjects() {
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
        } else {
          console.log("No token found");
        }
      }, []);

    const fetchProjects = async () => {
        if (!ownerId) return;
        setLoading(true);
        try {
          const response = await axios.get(`${API_URL}/api/projects/user/${ownerId}/projects`);
          setProjects(response.data);
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
            const response = await axios.get(`${API_URL}/api/users/${projectOwnerId}`);
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

      const clipDescription = (description) => {
        const n = description.length;
        if(n>=40){
          return description.slice(0,40)+".......";
        }
        else{
          return description;
        }
      };
    const deleteProject = async(projectId)=>{
      try{
        const response = await axios.delete(`${API_URL}/api/projects/${projectId}`);
        console.log(response);

      }
      catch(err){
        console.log(`Can't delete project : ${err}`)
      }
    }

    const remove_from_member = async(projectId)=>{
      try{

        const response = await axios.put(`${API_URL}/api/projects/${projectId}/remove_member`,{
          member_Id : ownerId
        })
        console.log(response);
      }
      catch(err){
        console.log(`failed to leave project : ${err}`)
      }
    }
    
    return(
        <div className="p-6">
          <h1 className="text-3xl text-cyan-500 font-bold">All Projects</h1>
          {loading && <p className="text-cyan-500 animate-pulse">Loading projects...</p>}
          {error && <p className="text-cyan-300">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {projects.map((project) => (
              <div key={project._id} className="border border-cyan-300 bg-white p-5 rounded-xl shadow-lg text-cyan-700">
                <div className="text-lg font-semibold mb-2 flex items-center">
                  <Code className="mr-3" /> {project.title}
                </div>
                <div className="text-sm mb-2 flex items-center">

                  <Pocket className="mr-3" /> {clipDescription(project.description)}
                </div>
                <div className="text-sm mb-4 flex items-center">
                  <User className="mr-3" /> {ownerNames[project.owner] || "Loading..."}
                </div>
                
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 text-cyan-600 border border-cyan-600 bg-white px-4 py-2 rounded-lg hover:bg-cyan-700 hover:text-white transition"
                  onClick={
                    async()=>{
                      if(project.owner === ownerId){
                        await deleteProject(project._id);
                      }
                      else{
                        await remove_from_member(project._id);
                      }
                      fetchProjects();
                    }
                  }
                  >
                    <LogOut size={16} /> Leave Project
                  </button>
                  <Link to={`/Project_m/${project._id}/home`}>
                    <button className="flex items-center gap-2 text-cyan-600 border border-cyan-600 bg-white px-4 py-2 rounded-lg hover:bg-cyan-700 hover:text-white transition">
                      <Eye size={16} /> View Project
                    </button>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </div>
    );
}

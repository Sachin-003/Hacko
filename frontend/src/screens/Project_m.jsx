import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import TaskMainBody from "./taskMainBody";
const API_URL = import.meta.env.VITE_API_URL;
export default function Project_m() {
    const { projectId } = useParams();
    const [ownerId, setOwnerId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [ProjectOwner, setProjectOwner] = useState("");
    const [projectOwnerName, setProjectOwnerName] = useState("");
    const [members, setMembers] = useState([]);
    const [skills, setSkills] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [memberNames, setMemberNames] = useState({});

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

    const get_project_details = async () => {
        try {
            const project = await axios.get(`${API_URL}/api/projects/${projectId}`);
            setProjectOwner(project.data.owner);
            setMembers(project.data.members);
            setSkills(project.data.skills);
            setTitle(project.data.title);
            setDescription(project.data.description);
        } catch (err) {
            console.log(err);
        }
    };

    const get_tasks = async () => {
        try {
            const tasks = await axios.get(`${API_URL}/api/tasks/${projectId}`);
            console.log(`tasks : ${tasks.data}`);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        get_project_details();
        get_tasks();
    }, [projectId]);

    const find_user_details = async (userId) => {
        try {
            const userData = await axios.get(`${API_URL}/api/users/${userId}`);
            return userData.data.name;
        } catch (err) {
            console.log(`Error in find_user_details : ${err}`);
            return "Unknown";
        }
    };

    useEffect(() => {
        const fetchMemberNames = async () => {
            const namesMap = {};
            for (const memberId of members) {
                namesMap[memberId] = await find_user_details(memberId);
            }
            setMemberNames(namesMap);
        };

        if (members.length > 0) {
            fetchMemberNames();
        }
    }, [members]);

    useEffect(() => {
        const fetchProjectOwnerName = async () => {
            const poName = await find_user_details(ProjectOwner);
            setProjectOwnerName(poName);
        };
        fetchProjectOwnerName();
    }, [ProjectOwner]);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            {/* Sidebar Section */}
            <div className="w-full md:w-1/4 bg-cyan-700 text-white p-6 shadow-lg">
                <h1 className="text-2xl font-bold mb-4">{title || "Loading..."}</h1>
                <p className="text-sm italic text-gray-200">Owned by: {projectOwnerName}</p>

                {/* Members List */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold border-b pb-2 mb-2">Team Members</h2>
                    <ul className="space-y-2">
                        {members.length === 0 ? (
                            <p className="text-gray-300">No members yet.</p>
                        ) : (
                            members.map((member, index) => (
                                <li key={index} className="bg-white text-black p-2 rounded-lg shadow">
                                    {memberNames[member] || "Loading..."}
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* Project Description */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold border-b pb-2 mb-2">Project Description</h2>
                    <p className="text-gray-200">{description || "No description available."}</p>
                </div>

                {/* Skills Section */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold border-b pb-2 mb-2">Skills Required</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.length === 0 ? (
                            <p className="text-gray-300">No skills listed.</p>
                        ) : (
                            skills.map((skill, index) => (
                                <span key={index} className="bg-white text-black px-3 py-1 rounded-lg shadow">
                                    {skill}
                                </span>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Button */}
                <div className="mt-6">
                    <Link
                        to={`/project_m/${projectId}/home/chat`}
                        className="block text-center bg-white text-cyan-700 font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-gray-200"
                    >
                        Chat
                    </Link>
                </div>
            </div>

            {/* Main Task Area */}
            <div className="flex-1 p-6">
                <TaskMainBody projectId={projectId} members={members} ownerId={ownerId} memberNames={memberNames} ProjectOwner={ProjectOwner} projectOwnerName={projectOwnerName} />
            </div>
        </div>
    );
}

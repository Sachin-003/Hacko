import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import axios from "axios";
import { User, Code, CheckCircle, XCircle } from "react-feather";

export default function Notification() {
    const [ownerId, setOwnerId] = useState(null);
    const [requests, setRequests] = useState([]);
    const [sendersData, setSendersData] = useState({});
    const [projectData, setProjectData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    const fetchJoinRequests = async () => {
        if (!ownerId) return;
        try {
            const response = await axios.get(`http://localhost:5000/api/notifications/recipient/${ownerId}`);
            setRequests(response.data.data);
        } catch (err) {
            setError("Failed to fetch Notifications");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJoinRequests();
    }, [ownerId]);

    useEffect(() => {
        const fetchUserData = async (userId) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setSendersData((prev) => ({ ...prev, [userId]: response.data.name }));
            } catch (err) {
                console.error(err);
            }
        };

        const fetchProjectData = async (projectId) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`);
                setProjectData((prev) => ({ ...prev, [projectId]: response.data.title }));
            } catch (err) {
                console.error(err);
            }
        };

        requests.forEach((request) => {
            if (request.sender && !sendersData[request.sender]) fetchUserData(request.sender);
            if (request.project && !projectData[request.project]) fetchProjectData(request.project);
        });
    }, [requests]);

    const remove_from_request = async (project_id, sender_Id) => {
        try {
            await axios.put(`http://localhost:5000/api/projects/${project_id}/remove_request`, { userId: sender_Id });
        } catch (err) {
            console.log(err);
        }
    };

    const delete_notification = async (notification_id) => {
        try {
            await axios.delete(`http://localhost:5000/api/notifications/${notification_id}`);
        } catch (err) {
            console.log(`Can't delete the notification: ${err}`);
        }
    };

    const add_member = async (project_id, sender_id) => {
        try {
            await axios.put(`http://localhost:5000/api/projects/${project_id}/add_member`, { member_Id: sender_id });
        } catch (err) {
            console.log(`Can't add member: ${err}`);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-cyan-300">
            <h2 className="text-2xl font-bold text-cyan-700 mb-4">Join Requests</h2>
            {loading ? (
                <p className="text-cyan-500">Loading notifications...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : requests.length === 0 ? (
                <p className="text-cyan-500">No join requests at the moment.</p>
            ) : (
                requests.map((request) => (
                    <div key={request._id} className="flex items-center justify-between bg-cyan-100 p-4 rounded-lg mb-3">
                        <div>
                            <p className="text-cyan-800 font-medium">
                                <User className="inline-block w-5 h-5 mr-2 text-cyan-500" />
                                {sendersData[request.sender] || "Loading..."} wants to join
                            </p>
                            <p className="text-cyan-700">
                                <Code className="inline-block w-5 h-5 mr-2 text-cyan-500" />
                                {projectData[request.project] || "Loading..."}
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <button className="flex items-center bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
                                onClick={async () => {
                                    await add_member(request.project, request.sender);
                                    await remove_from_request(request.project, request.sender);
                                    await delete_notification(request._id);
                                    fetchJoinRequests();
                                }}>
                                <CheckCircle className="w-5 h-5 mr-2" /> Accept
                            </button>
                            <button className="flex items-center bg-cyan-400 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 transition"
                                onClick={async () => {
                                    await remove_from_request(request.project, request.sender);
                                    await delete_notification(request._id);
                                    fetchJoinRequests();
                                }}>
                                <XCircle className="w-5 h-5 mr-2" /> Ignore
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

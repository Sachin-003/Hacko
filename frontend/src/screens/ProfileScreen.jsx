import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export default function Profile() {
    const [ownerId, setOwnerId] = useState(null);
    const [userData, setUserData] = useState(null);

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

    const getUserDetails = async (ownerId) => {
        try {
            const response = await axios.get(`${API_URL}/api/users/${ownerId}`);
            setUserData(response.data);
        } catch (err) {
            console.error("Unable to get user details:", err);
        }
    };

    useEffect(() => {
        if (ownerId) {
            getUserDetails(ownerId);
        }
    }, [ownerId]);

    return (
        <div className="flex justify-center items-center h-screen bg-cyan-100">
            {userData ? (
                <div className="bg-cyan-600 text-white p-8 rounded-2xl shadow-lg w-80">
                    <h2 className="text-2xl font-bold text-center">Profile</h2>
                    <div className="mt-6">
                        <p className="text-lg"><strong>Name:</strong> {userData.name}</p>
                        <p className="text-lg"><strong>Email:</strong> {userData.email}</p>
                    </div>
                </div>
            ) : (
                <p className="text-cyan-800 text-lg">Loading profile...</p>
            )}
        </div>
    );
}

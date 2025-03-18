import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode"; 
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const socket = io.connect(`${API_URL}`);

export default function ProjectChat() {
    const { projectId } = useParams();
    

    const [ownerId, setOwnerId] = useState(null);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setOwnerId(decodedToken.id);
                setUsername(decodedToken.username || "Unknown");
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to WebSocket");
        });

        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("connect");
            socket.off("receive_message");
        };
    }, [socket]);

    
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${API_URL}/messages/${projectId}`);
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
        socket.emit("join_room", projectId);
    }, [projectId]);

    const sendMessage = async () => {
        if (message.trim()) {
            const newMessage = {
                room: projectId,
                sender: ownerId,
                username,
                text: message,
                timestamp: new Date().toISOString()
            };

            socket.emit("send_message", newMessage);
            setMessage("");
            
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            
            <div className="bg-cyan-700 text-white p-4 text-lg font-semibold shadow-md">
                Project Chat - {projectId}
            </div>

            
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex mb-2 ${msg.sender === ownerId ? "justify-end" : "justify-start"}`}>
                        <div className={`p-3 rounded-lg shadow-md max-w-xs ${msg.sender === ownerId ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                            <p className="text-sm font-bold">{msg.sender === ownerId ? "You" : msg.sender}</p>
                            <p className="text-md">{msg.text}</p>
                            <p className="text-xs text-gray-600">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            
            <div className="p-4 bg-white flex items-center border-t">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800">
                    Send
                </button>
            </div>
        </div>
    );
}

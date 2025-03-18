import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import CollaborateScreen from "./CollaborateScreen";
import Notification from "./Notification";
import PostProject from "./PostP";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Home, Code, Terminal, PlusSquare, Bell, User, Menu } from "react-feather";
import ProfileScreen from "./ProfileScreen";
import YourProjects from "./YourProjects";

export default function Body({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/Login");
    };

    return (
        <div className="flex h-screen flex-col md:flex-row">
            {/* Mobile Menu Button */}
            <div className="md:hidden flex justify-between items-center bg-white shadow p-4">
                <h1 className="text-cyan-700 font-bold text-lg">CodeMingle</h1>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu size={24} className="text-cyan-700" />
                </button>
            </div>

            {/* Sidebar / Dropdown Menu */}
            <div className={`absolute md:relative bg-white shadow-md md:shadow-none md:w-1/6 m-2 rounded-md transition-all duration-300 ${menuOpen ? "top-12 left-0 w-full z-50" : "hidden md:block"}`}>
                <div className="flex flex-col">
                    <Link to="/HomeScreen" onClick={() => setMenuOpen(false)}>
                        <div className={`flex p-4 ${isActive('/HomeScreen') ? "bg-cyan-700 text-white rounded-md" : "bg-transparent text-cyan-700"}`}>
                            <Home className="mx-2" size={22} />
                            <h1>Home</h1>
                        </div>
                    </Link>
                    <Link to="/CollaborateScreen" onClick={() => setMenuOpen(false)}>
                        <div className={`flex p-4 ${isActive('/CollaborateScreen') ? "bg-cyan-700 text-white" : "bg-transparent text-cyan-700"}`}>
                            <Terminal className="mx-2" size={22} />
                            <h1>Collaborate</h1>
                        </div>
                    </Link>
                    <Link to="/PostP" onClick={() => setMenuOpen(false)}>
                        <div className={`flex p-4 ${isActive('/PostP') ? "bg-cyan-700 text-white" : "bg-transparent text-cyan-700"}`}>
                            <PlusSquare className="mx-2" size={22} />
                            <h1>Post Project</h1>
                        </div>
                    </Link>
                    <Link to="/Notification" onClick={() => setMenuOpen(false)}>
                        <div className={`flex p-4 ${isActive('/Notification') ? "bg-cyan-700 text-white" : "bg-transparent text-cyan-700"}`}>
                            <Bell className="mx-2" size={22} />
                            Notification
                        </div>
                    </Link>
                    <Link to="/YourProjects" onClick={() => setMenuOpen(false)}>
                        <div className={`flex p-4 ${isActive('/YourProjects') ? "bg-cyan-700 text-white" : "bg-transparent text-cyan-700"}`}>
                            <Code className="mx-2" size={22} />
                            Your Projects
                        </div>
                    </Link>
                    <Link to="/ProfileScreen" onClick={() => setMenuOpen(false)}>
                        <div className={`flex p-4 ${isActive('/ProfileScreen') ? "bg-cyan-700 text-white" : "bg-transparent text-cyan-700"}`}>
                            <User className="mx-2" size={22} />
                            Profile
                        </div>
                    </Link>
                </div>

                <div className="flex w-full items-center">
                    <div className="flex justify-center bg-cyan-700 w-full text-white p-4 m-2 rounded-3xl">
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full m-2 rounded-md p-10 overflow-y-auto max-h-screen scrollbar-transparent">
                <Routes>
                    <Route path="/HomeScreen" element={<HomeScreen />} />
                    <Route path="/CollaborateScreen" element={<CollaborateScreen />} />
                    <Route path="/PostP" element={<PostProject />} />
                    <Route path="/Notification" element={<Notification />} />
                    <Route path="/ProfileScreen" element={<ProfileScreen />} />
                    <Route path="/YourProjects" element={<YourProjects />} />
                    {/* Default Route */}
                    <Route path="*" element={<Navigate to="/HomeScreen" replace />} />
                </Routes>
            </div>
        </div>
    );
}
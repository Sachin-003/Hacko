import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Project_m from './screens/Project_m';
import ProjectChat from './screens/ProjectChat';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/*"
                    element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/Login" />}
                />
                <Route
                    path="/Login"
                    element={isAuthenticated ? <Navigate to="/*" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route path="/Signup" element={<Signup setIsAuthenticated={setIsAuthenticated}/>} />
                <Route path="/Home/*" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
                <Route path = "/Project_m/:projectId/home" element = {<Project_m/>}/>
                <Route path = "/Project_m/:projectId/home/chat" element = {<ProjectChat/>}/>
            </Routes>
        </Router>
    );
}

export default App;

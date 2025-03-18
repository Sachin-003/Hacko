import React, { useState } from "react";
import Heading from "../components/heading";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

export default function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill out both fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);
            setIsAuthenticated(true);
            navigate("/Home");
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Invalid credentials!");
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center p-4 bg-gray-100">
            <div className="w-full max-w-3xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden bg-white">
                {/* Left Section */}
                <div className="bg-cyan-950 w-full md:w-1/2 flex justify-center items-center p-10">
                    <h1 className="font-bold text-cyan-200 text-3xl md:text-4xl text-center">
                        Welcome Back!
                    </h1>
                </div>
                
                {/* Right Section */}
                <div className="w-full p-8 md:p-10">
                    <div className="flex justify-center mb-6">
                        <Heading className="text-cyan-900" />
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-cyan-900 font-medium">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-900 w-full"
                                placeholder="Enter your email"
                            />
                        </div>
                        
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-cyan-900 font-medium">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-900 w-full"
                                placeholder="Enter your password"
                            />
                        </div>
                        
                        {error && <p className="text-red-600 text-center font-medium animate-pulse">{error}</p>}
                        
                        <button
                            type="submit"
                            className="w-full bg-cyan-600 text-white font-semibold p-3 rounded-lg hover:bg-cyan-700 transition duration-300 shadow-md"
                        >
                            Log in
                        </button>
                    </form>
                    
                    <div className="flex justify-center text-sm mt-4">
                        <span className="text-cyan-900">New here?</span>
                        <Link to="/Signup" className="text-cyan-700 font-bold mx-2 hover:text-cyan-900 transition duration-200">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

Login.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
};

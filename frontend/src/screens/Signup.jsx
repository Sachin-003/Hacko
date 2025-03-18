import React, { useState } from "react";
import Heading from "../components/heading";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export default function Signup({ setIsAuthenticated }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!email || !password || !username) {
            setError('Please fill out all fields.');
            return;
        }
        try {
            const response = await axios.post(`${API_URL}/api/auth/register`, { 
                "name": username,
                "email": email,
                "password": password    
            });

            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            navigate('/Home');
        } catch (err) {
            console.log(err);
            setError('Something went wrong. Please try again later.');
        }
    };
    return(
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100 p-4">
            <div className="w-full max-w-3xl flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
                <div className="bg-cyan-950 w-full md:w-1/2 flex justify-center items-center p-10">
                    <h1 className="font-bold text-cyan-200 text-3xl md:text-4xl text-center">
                        Sign Up
                    </h1>
                </div>
                <div className="w-full bg-white p-6">
                    <div className="flex justify-center m-4">
                        <Heading className="text-cyan-900"/>
                    </div>
                    <div className="py-6">
                        <form onSubmit={handleSignUp} className="space-y-4">
                            <div className="flex flex-col items-center">
                                <label htmlFor="username" className="text-cyan-900">Username</label>
                                <input 
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    value={username} 
                                    className="p-2 rounded-lg border-cyan-500 border-2 bg-transparent text-cyan-900 w-full max-w-sm focus:ring-2 focus:ring-cyan-600"
                                    onChange={(e) => setUsername(e.target.value)} 
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <label htmlFor="email" className="text-cyan-900">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={email} 
                                    className="p-2 rounded-lg border-cyan-500 border-2 bg-transparent text-cyan-900 w-full max-w-sm focus:ring-2 focus:ring-cyan-600"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <label htmlFor="password" className="text-cyan-900">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    value={password} 
                                    className="p-2 rounded-lg border-cyan-500 border-2 bg-transparent text-cyan-900 w-full max-w-sm focus:ring-2 focus:ring-cyan-600"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-center">
                                <button className="bg-cyan-600 text-white rounded-lg p-2 px-10 hover:bg-cyan-700 transition duration-300 w-full max-w-sm" type="submit">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                        {error && (
                            <p className="text-center text-red-600 animate-pulse mt-2">{error}</p>
                        )}
                    </div>
                    <div className="flex justify-center text-sm">
                        <span className="text-cyan-900">Already have an account?</span>
                        <Link to="/">
                            <span className="text-cyan-800 font-bold mx-2 hover:text-cyan-900 transition duration-200">Log in</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
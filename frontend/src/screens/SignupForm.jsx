import React, { useState } from "react";
import Heading from "../components/heading";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupForm({ setIsAuthenticated }){
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!Email || !Password || !Username) {
            setError('Please fill out all fields.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { 
                "name": Username,
                "email": Email,
                "password": Password    
            });

            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            navigate('/Home');
        } catch (err) {
            console.log(err);
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="w-full bg-cyan-100">
            <div className="flex justify-center m-10">
                <Heading className="text-black"/>
            </div>
            <div>
                <form onSubmit={handleSignUp}>
                    <div className="flex justify-center m-2">
                        <label htmlFor="Username" className="mx-2 p-2">Username</label>
                        <input 
                            type="text" 
                            id="Username" 
                            name="Username" 
                            value={Username} 
                            className="p-2 rounded-full border-black border-2 bg-transparent" 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className="flex justify-center m-2">
                        <label htmlFor="Email" className="mx-2 p-2">Email</label>
                        <input 
                            type="text" 
                            id="Email" 
                            name="Email" 
                            value={Email} 
                            className="p-2 rounded-full border-black border-2 bg-transparent" 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center m-2">
                        <label htmlFor="Password" className="mx-2 p-2">Password</label>
                        <input 
                            type="password" 
                            id="Password" 
                            name="Password" 
                            value={Password} 
                            className="p-2 rounded-full border-black border-2 bg-transparent" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center m-2 p-4">
                        <button className="bg-cyan-800 text-white rounded-full p-2 px-6">Sign Up</button>
                    </div>
                </form>
                {error && (
                    <p className="text-center text-red-600 animate-pulse">{error}</p>
                )}
            </div>
            <div className="flex justify-center">
                <div>Already have an account?</div>
                <Link to="/">
                    <div className="text-amber-950 font-bold mx-2">Log in</div>
                </Link>
            </div>
        </div>
    );
}

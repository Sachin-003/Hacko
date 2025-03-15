import React, { useState } from "react";
import Heading from "../components/heading";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function LoginForm({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill out both fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);

            navigate('/Home');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Invalid credentials!');
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <div className="w-full bg-cyan-100">
            <div className="flex justify-center m-10">
                <Heading className="text-cyan-900" />
            </div>
            <div className="py-10">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center m-2">
                        <label htmlFor="email" className="mx-2 p-2 text-cyan-900">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            aria-label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 rounded-full border-cyan-500 border-2 bg-transparent text-cyan-900"
                        />
                    </div>
                    <div className="flex justify-center m-2">
                        <label htmlFor="Password" className="mx-2 p-2 text-cyan-900">Password</label>
                        <input
                            type="password"
                            id="Password"
                            name="Password"
                            aria-label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 rounded-full border-cyan-500 border-2 bg-transparent text-cyan-900"
                        />
                    </div>
                    <div className="flex justify-center m-4">
                        <button className="bg-cyan-600 text-white rounded-full p-2 px-10 hover:bg-cyan-700 transition duration-300" type="submit">
                            Log in
                        </button>
                    </div>
                </form>
                {error && (
                    <p className="text-center text-cyan-700 animate-pulse">{error}</p>
                )}
            </div>
            <div className="flex justify-center">
                <div className="text-cyan-900">Create Account?</div>
                <Link to="/Signup">
                    <div className="text-cyan-800 font-bold mx-2 hover:text-cyan-900 transition duration-200">Sign Up</div>
                </Link>
            </div>
        </div>
    );
}

LoginForm.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
};

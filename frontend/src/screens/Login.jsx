import React from "react";
import LoginFlag from "../components/LoginFlag";
import LoginForm from "./LoginForm";

export default function Login({ setIsAuthenticated }) {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            
            <div className="h-3/4 w-1/2 flex">
                <LoginFlag />
                <LoginForm setIsAuthenticated={setIsAuthenticated}/>
            </div>
        </div>
    );
}

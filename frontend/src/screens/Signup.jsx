import React from "react";

import SignupFlag from "../components/SignUpFlag";
import SignupForm from "./SignupForm";

export default function Signup({ setIsAuthenticated }){
    return(
        <div className="h-screen w-screen flex justify-center items-center">
            
            <div className="h-3/4 w-1/2 flex">
                <SignupFlag/>
                <SignupForm setIsAuthenticated={setIsAuthenticated}/>
            </div>
        </div>
    )
}
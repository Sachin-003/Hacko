import React, { useState } from "react";
import Header from "../components/Header";
import Body from "./Body";

export default function Home({ setIsAuthenticated }) {  // Use setIsAuthenticated here
    return (
        <div className="flex flex-col">
            <Header />
            <Body setIsAuthenticated={setIsAuthenticated} />  {/* Pass it down to Body */}
        </div>
    );
}

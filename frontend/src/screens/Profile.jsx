import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import axios from "axios";
import { Code, Pocket, User, LogOut, Eye } from "react-feather";
import { Link } from "react-router-dom";

export default function Profile(){

    const [ownerId, setOwnerId] = useState(null);
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            setOwnerId(decodedToken.id);
          } catch (error) {
            console.error("Invalid token:", error);
          }
        }
      }, []);

    console.log(ownerId);

    return(
        <div>
            <h1>{ownerId}</h1>
        </div>
    )
}
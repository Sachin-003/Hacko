import React from "react";
import dp from "../assets/dp.jpg"

export default function Profilepic(){
    return(
        <div>
            <img src={dp} alt="Profile Pic" className=" rounded-full h-16 w-16 border-4 border-teal-950 border-solid"/>
        </div>
    )

}
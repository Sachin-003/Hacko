import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CollaborateScreen from "./CollaborateScreen";

export default function HomeScreen() {
    

    return (
        <div className="h-full overflow-y-auto scrollbar-transparent">
            
            <div className="h-full flex items-center justify-center  text-cyan-800">
                <div className="text-center">
                    <h1 className="text-6xl font-bold">Hacko</h1>
                    <p className="text-lg mt-4">
                    Hack, build, and grow—because great code is never written alone.
                    </p>
                </div>
            </div>

            
        </div>
    );
}

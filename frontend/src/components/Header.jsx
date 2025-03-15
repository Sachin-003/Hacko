import React from "react";
import Heading from "./heading";
import Profilepic from "./Profilepic";

export default function Header() {
  return (
    <div className="p-10 bg-cyan-100 flex justify-between items-center m-2 rounded-md">
      
      <Heading/>
      {/* <Profilepic /> */}
    </div>
  );
}

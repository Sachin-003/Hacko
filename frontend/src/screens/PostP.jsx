import React, { useState, useEffect } from "react";
import Select from "react-select";
import { jwtDecode } from "jwt-decode"; // Correct import for version 4.0.0
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
const options = [
  { value: "3D Modeling", label: "3D Modeling" },
  { value: "Agile Methodologies", label: "Agile Methodologies" },
  { value: "Analytical Thinking", label: "Analytical Thinking" },
  { value: "Android Development", label: "Android Development" },
  { value: "API Integration", label: "API Integration" },
  { value: "App Development", label: "App Development" },
  { value: "Arduino Programming", label: "Arduino Programming" },
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Augmented Reality", label: "Augmented Reality" },
  { value: "AWS (Amazon Web Services)", label: "AWS (Amazon Web Services)" },
  { value: "Big Data Analytics", label: "Big Data Analytics" },
  { value: "Blockchain Development", label: "Blockchain Development" },
  { value: "Bootstrap", label: "Bootstrap" },
  { value: "C Programming", label: "C Programming" },
  { value: "C++ Programming", label: "C++ Programming" },
  { value: "Cloud Computing", label: "Cloud Computing" },
  { value: "Communication Skills", label: "Communication Skills" },
  { value: "Conflict Resolution", label: "Conflict Resolution" },
  { value: "Content Writing", label: "Content Writing" },
  { value: "Creativity", label: "Creativity" },
  { value: "Critical Thinking", label: "Critical Thinking" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Data Analysis", label: "Data Analysis" },
  { value: "Data Structures", label: "Data Structures" },
  { value: "Database Management", label: "Database Management" },
  { value: "Debugging", label: "Debugging" },
  { value: "DevOps", label: "DevOps" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Django", label: "Django" },
  { value: "Docker", label: "Docker" },
  { value: "Electrical Circuit Design", label: "Electrical Circuit Design" },
  { value: "Embedded Systems", label: "Embedded Systems" },
  { value: "Ethical Hacking", label: "Ethical Hacking" },
  { value: "Express.js", label: "Express.js" },
  { value: "Figma", label: "Figma" },
  { value: "Flutter Development", label: "Flutter Development" },
  { value: "Git/GitHub", label: "Git/GitHub" },
  { value: "GraphQL", label: "GraphQL" },
  { value: "HTML & CSS", label: "HTML & CSS" },
  { value: "Internet of Things (IoT)", label: "Internet of Things (IoT)" },
  { value: "Java Development", label: "Java Development" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "JIRA", label: "JIRA" },
  { value: "Kubernetes", label: "Kubernetes" },
  { value: "Leadership", label: "Leadership" },
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "MATLAB", label: "MATLAB" },
  { value: "Microsoft Excel", label: "Microsoft Excel" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "Multitasking", label: "Multitasking" },
  { value: "Next.js", label: "Next.js" },
  { value: "Node.js", label: "Node.js" },
  { value: "Object-Oriented Programming (OOP)", label: "Object-Oriented Programming (OOP)" },
  { value: "OpenCV", label: "OpenCV" },
  { value: "Pandas (Python)", label: "Pandas (Python)" },
  { value: "PHP", label: "PHP" },
  { value: "Problem-Solving", label: "Problem-Solving" },
  { value: "Project Management", label: "Project Management" },
  { value: "Public Speaking", label: "Public Speaking" },
  { value: "Python Programming", label: "Python Programming" },
  { value: "React Native", label: "React Native" },
  { value: "React.js", label: "React.js" },
  { value: "Redux", label: "Redux" },
  { value: "RESTful API Development", label: "RESTful API Development" },
  { value: "Robotics", label: "Robotics" },
  { value: "ROS", label: "ROS" },
  { value: "Ruby on Rails", label: "Ruby on Rails" },
  { value: "Search Engine Optimization (SEO)", label: "Search Engine Optimization (SEO)" },
  { value: "Shell Scripting", label: "Shell Scripting" },
  { value: "Social Media Management", label: "Social Media Management" },
  { value: "Software Testing", label: "Software Testing" },
  { value: "SQL", label: "SQL" },
  { value: "Tailwind CSS", label: "Tailwind CSS" },
  { value: "Teamwork", label: "Teamwork" },
  { value: "TensorFlow", label: "TensorFlow" },
  { value: "Time Management", label: "Time Management" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Unity 3D", label: "Unity 3D" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Version Control", label: "Version Control" },
  { value: "Video Editing", label: "Video Editing" },
  { value: "Vite Framework", label: "Vite Framework" },
  { value: "Vue.js", label: "Vue.js" },
  { value: "Web Development", label: "Web Development" },
  { value: "Wireframing", label: "Wireframing" },
  { value: "WordPress", label: "WordPress" },
  { value: "XML", label: "XML" },
  { value: "YAML", label: "YAML" },
  { value: "Zapier Automation", label: "Zapier Automation" },
  { value: "Zoho CRM", label: "Zoho CRM" }
];


export default function PostProject() {
  const [ownerId, setOwnerId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const postProject = async (e) => {
    e.preventDefault();
    if (!ownerId) {
      setError("Owner not found");
      return;
    }
    if (!projectName || !description || skills.length === 0) {
      setError("All fields are mandatory");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/api/projects`, {
        title: projectName,
        description,
        owner: ownerId,
        skills,
      });
      console.log(response.data); 
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid credentials!");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  useEffect(() => {
    
    const token = localStorage.getItem("token");

    if (token) {
      try {
       
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        
        setOwnerId(decodedToken.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.log("No token found");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl text-cyan-600 font-bold mb-8">Post a New Project</h1>
      <form
        onSubmit={postProject}
        className="bg-cyan-500 shadow-md rounded-lg p-8 w-full max-w-lg"
      >
        {error && (
          <p className="mb-4 text-red-600 text-center font-medium">{error}</p>
        )}

        <div className="mb-6 ">
          <label
            htmlFor="projectName"
            className="block font-medium mb-2 text-teal-800 "
          >
            Project Name
          </label>
          <input
            type="text"
            name="projectName"
            id="projectName"
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
            className="w-full text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-800"
            placeholder="Enter your project name"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block font-medium mb-2 text-cyan-800 "
          >
            Project Description
          </label>
          <textarea
            name="description"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full border text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-700"
            placeholder="Enter your project description"
            rows={4}
          ></textarea>
        </div>

        <div className="mb-6">
          <label
            htmlFor="skills"
            className="block text-cyan-800 font-medium mb-2"
          >
            Required Skills
          </label>
          <Select
            defaultValue={skills}
            onChange={(selectedOptions) =>
              setSkills(selectedOptions.map((option) => option.value))
            }
            options={options}
            isMulti
            
            classNamePrefix="react-select"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-700 text-white font-medium py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
export default function TaskMainScreen(props) {
    
    const projectId = props.projectId;
    const members = props.members;
    const [tasks,setTasks] = useState([]);
    const [title,setTaskTitle] = useState("");
    const [description,setTaskDescription] = useState("");
    const [assigned_to,setAssignedTo] = useState("");
    const ProjectOwner = props.ProjectOwner;
    const ProjectOwnerName = props.projectOwnerName;
    const error = "";
    const loading = false;
    const userId = props.ownerId;
    const memberNames = props.memberNames;
    console.log(memberNames);

    const create_new_task = async()=>{
        try{

            const task = await axios.post(`http://localhost:5000/api/tasks/`,{
                projectId,
                title,
                description,
                assigned_by: userId,
                assigned_to
                
            })
            console.log(task);

        }
        catch(err){
            console.log(`can't create new task : ${err}`);
        }
    }

    const get_project_tasks = async()=>{
        try{

            const tasks = await axios.get(`http://localhost:5000/api/tasks/${projectId}`);
            setTasks(tasks.data);

        }
        catch(err){
            console.log(`can't get tasks : ${err}`);
        }

    }
    useEffect(
        ()=>{
            get_project_tasks();
        }
    )
    console.log(`Tasks : ${tasks}`);

    const update_task_status = async (taskId, status) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
                status: status,
            });
            console.log(response.data); // Log the response data
        } catch (err) {
            console.log(`Can't Update status: ${err.message}`);
        }
    };
    



    return (
        <div className="p-6 bg-cyan-100 min-h-screen">
            <h2 className="text-2xl font-bold text-cyan-700 mb-4">Task Management</h2>
            
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="bg-white p-4 rounded-lg shadow">
                <input type="text" placeholder="Task Title" value={title} 
                    onChange={(e) => setTaskTitle(e.target.value)} 
                    className="w-full p-2 border rounded mb-2" 
                />
                <textarea placeholder="Task Description" value={description} 
                    onChange={(e) => setTaskDescription(e.target.value)} 
                    className="w-full p-2 border rounded mb-2">
                </textarea>
                <select value={assigned_to} 
                    onChange={(e) => setAssignedTo(e.target.value)} 
                    className="w-full p-2 border rounded mb-2">
                    <option value="">Assign To</option>
                    <option value={ProjectOwner}>{ProjectOwnerName}</option>
                    {members.map((member) => (
                        <option key={member} value={member}>{memberNames[member]}</option>
                    ))}
                </select>
                <button className="bg-cyan-700 text-white p-2 rounded w-full"
                onClick={()=>{create_new_task();}}
                >Create Task</button>
            </div>

            {loading ? (
                <p className="text-cyan-700 mt-4">Loading tasks...</p>
            ) : (
                <div className="mt-6">
                    {tasks.length === 0 ? (
                        <p className="text-gray-500">No tasks found.</p>
                    ) : (
                        tasks.map((task) => (
                            <div key={task._id} className="bg-white p-4 rounded-lg shadow mb-2">
                                <h3 className="text-lg font-semibold text-cyan-700">{task.title}</h3>
                                <p className="text-sm text-gray-600">{task.description}</p>
                                <p className="text-sm text-gray-500">Assigned to: {task.assigned_to?.name || "Unknown"}</p>
                                <div className="mt-2 flex space-x-2">
                                    
                                    
                                    <div>
                                        
                                        {
                                            (task.assigned_to._id===userId || task.assigned_by._id===userId)?
                                            <div>
                                                <button className="bg-cyan-500 text-white px-3 py-1 mx-2 rounded"
                                                onClick={
                                                    async()=>{
                                                        await update_task_status(task._id,'In Progress')
                                                    }
                                                }
                                                >{(task.status === "Pending")? "Accept": "Accpted"}</button>
                                                <button className="bg-cyan-500 text-white px-3 py-1 rounded"
                                                onClick={
                                                    async()=>{
                                                        await update_task_status(task._id,'Completed')
                                                    }
                                                }
                                                >{(task.status === "Completed")? "Completed": "Complete"}</button>
                                                
                                            
                                            </div>
                                            :
                                            <button className="bg-cyan-500 text-white px-3 py-1 rounded">In Progress</button>
                                        }

                                    </div>
                                    
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

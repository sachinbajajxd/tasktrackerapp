import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

const Home = () => {

    // Check if the token exists in local storage
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('/');
    }

    
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        axios.get(`http://localhost:3000/tasks/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => setTasks(response.data))
        .catch(error => console.error('Error fetching tasks:', error));

      }, []);

      console.log(tasks);



    return (
        <div>
            <div>You are logged in</div>
            <h1>Task List</h1>
            <ul>
                {tasks.map(task => (
                <li key={task._id}>{task.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default Home;
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {

    // Check if the token exists in local storage
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
 
    if (!isAuthenticated) {
        navigate('/');
    }
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    // Create a URL parameter for search query
    const searchParam = search ? `?search=${search}` : '';
    
    axios.get(`https://tasktrackerapp-qeum.onrender.com/tasks/${userId}${searchParam}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => setTasks(response.data))
    .catch(error => console.error('Error fetching tasks:', error));

  }, [search]);

  const handleDelete = async (id) => {

    const token = localStorage.getItem('token');

    axios.delete(`https://tasktrackerapp-qeum.onrender.com/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
      .then((response) => {
        console.log('Item deleted:', response.data);
        toast.success('task deleted successfully');
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        toast.error(`Error in deleteing task ${error}`);
      });
  }

  const handleCheckboxChange = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex flex-row justify-around items-center">
        <h2 className="text-xl font-semibold mb-2">
          {new Date().getHours() < 12 ? 'Good Morning, ' : 'Good Evening, '}
        {username}</h2>
        {isAuthenticated && (
          <input
            type="text"
            placeholder="Search tasks"
            className="bg-gray-300 w-96 text-gray-800 py-2 px-2 rounded"
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
        <button className="mb-2 bg-green-500 p-2">
          <Link to='/add-task'>+ Add a new task</Link>
        </button>
      </div>

      {tasks.length === 0 ? 
              <h1 className="text-4xl shadow-lg p-4 mt-20">Add your first task</h1>
             : 

      <table className="mt-5 w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-center">Select</th>
            <th className="p-2 text-center">Title</th>
            <th className="p-2 text-center">Due Date</th>
            <th className="p-2 text-center">Description</th>
            <th className="p-2 text-center">Priority</th>
            <th className="p-2 text-center">Status</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>

          {tasks.map(task => (
            <tr key={task._id} className="border-b">
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task._id)}
                  onChange={() => handleCheckboxChange(task._id)}
                />
              </td>
              <td className="p-2">{task.title}</td>
              <td className="p-2">{new Date(task.dueDate).toLocaleDateString()}</td>
              <td className="p-2">{task.description}</td>
              <td className="p-2">{task.priority}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded ${
                    selectedTasks.includes(task._id) ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {selectedTasks.includes(task._id) ? 'Completed' : 'Pending'}
                </span>
              </td>
              <td className="p-2">
                <Link className="text-blue-500 mr-2" to="/edit" state={task}>Update /</Link>
                <button className="text-red-500" onClick={() => handleDelete(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    }
      <div>
      </div>
    </div>
  );
}

export default Home;

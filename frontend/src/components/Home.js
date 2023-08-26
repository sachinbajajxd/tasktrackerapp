import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Home = () => {

    // Check if the token exists in local storage
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate();
    const [deleted, setDeleted] = useState(false);
 
    if (!isAuthenticated) {
        navigate('/');
    }
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

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

  const handleDelete = async (id) => {

    const token = localStorage.getItem('token');

    axios.delete(`http://localhost:3000/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })
      .then((response) => {
        console.log('Item deleted:', response.data);
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
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
      <h2 className="text-xl font-semibold mb-2">Task List</h2>
      <table className="w-full border-collapse">
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
                <button className="text-blue-500 mr-2">Update /</button>
                <button className="text-red-500" onClick={() => handleDelete(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="mt-5 bg-blue-700 p-2">
            <Link to='/add-task'>Add a new task</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const UpdateTask = (props) => {

  // Check if the token exists in local storage
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
      navigate('/');
  }  

  const propsData = location.state;

  const [title, setTitle] = useState(propsData.title);
  const [description, setDescription] = useState(propsData.description);
  const [dueDate, setDueDate] = useState(propsData.dueDate);
  const [priority, setPriority] = useState(propsData.priority);
  const token = localStorage.getItem('token');


  const handleSubmit = (event) => {
    event.preventDefault();

    const taskData = {
      title,
      description,
      dueDate,
      priority,
    };

    const id = propsData._id

    axios.put(`http://localhost:3000/tasks/${id}`, taskData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
    })
      .then(response => {
        console.log('Task updated:', response.data);
        toast.success('Task updated successfully');
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('');
        navigate('/home');
      })
      .catch(error => {
        console.error('Error updating task:', error);
        toast.error(`Error in updating task ${error}`);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-md w-96 p-6">
        <h2 className="text-xl font-semibold mb-4">Update your Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border border-gray-300 p-2 w-full h-32 rounded"
          />
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
          >
            <option value="">Select Priority</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTask;

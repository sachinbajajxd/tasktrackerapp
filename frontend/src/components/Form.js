import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Form = () => {

  // Check if the token exists in local storage
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
      navigate('/');
  }  

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = (event) => {
    event.preventDefault();

    const taskData = {
      title,
      description,
      dueDate,
      priority,
    };

    axios.post('https://tasktrackerapp-qeum.onrender.com/createtask', taskData, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
    })
      .then(response => {
        console.log('Task created:', response.data);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('');
        toast.success('Task created successfully');
        navigate('/home');
      })
      .catch(error => {
        console.error('Error creating task:', error);
        toast.error(`Error creating task ${error}`);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-md w-96 p-6">
        <h2 className="text-xl font-semibold mb-4">Create a Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded" required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border border-gray-300 p-2 w-full h-32 rounded" required
          />
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded" required
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded" required
          >
            <option value="">Select Priority</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;

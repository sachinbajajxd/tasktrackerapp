import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:3000/signup', {
            username,
            email,
            password
        });
        console.log('Signup successful:', response.data);
        toast.success('Sign up successful, please login to proceed');
        navigate('/');
      } catch (error) {
        setError('Signup failed. Please try again.');
        toast.error(`Signup failed. Please try again ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-200 flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 font-medium transition duration-300 hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-3">
            <Link to="/">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

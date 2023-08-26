import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3000/login', {
            email,
            password
        });
        console.log('Login successful:', response.data);
        const token=response.data.token;
        console.log(token);
        localStorage.setItem('token', token);
        navigate('/home');
        
      } catch (error) {
        setError('Login failed. Please try again.', error);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-200 flex items-center justify-center bg-gray-100">
      <div className="max-w-md h-3/4 w-full p-6 bg-white rounded-lg shadow-md mb-20">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <div className="mt-3">
            <Link to="/signup">Don't have an account? Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

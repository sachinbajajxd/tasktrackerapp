import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Navbar = () => {

  const token=localStorage.getItem('token');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const handleLogout = () =>{
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  }


  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="flex items-center">
        {token ? (
            <Link to="/home" className="text-white text-xl font-semibold mr-4">
            TaskList
            </Link>
            ) : (
                <Link to="/" className="text-white font-semibold mr-4 hover:underline">
                TaskList
                </Link>
            )}
        {token && (
          <input
            type="text"
            placeholder="Search tasks"
            className="bg-white text-gray-800 py-1 px-2 rounded"
          />
        )}
      </div>
      <div>
        {token ? (
          <Link
            onClick={handleLogout} to='/'
            className="text-white font-semibold hover:underline"
          >
            Logout
          </Link>
        ) : (
          <div className="flex">
            <Link to="/" className="text-white font-semibold mr-4 hover:underline">
              Login
            </Link>
            <Link to="/signup" className="text-white font-semibold hover:underline">
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';


const Navbar = () => {

  const token=localStorage.getItem('token');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const handleLogout = () =>{
    localStorage.clear();
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
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

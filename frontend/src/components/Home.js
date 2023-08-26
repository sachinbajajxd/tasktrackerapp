import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    // Check if the token exists in local storage
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('/');
    }

    return (
        <div>You are logged in</div>
    )
}

export default Home;
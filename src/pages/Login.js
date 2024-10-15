import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/users/login', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/todos');
        } catch (error) {
            alert('Login failed! Please check your credentials.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Login
                </button>
            </form>
            <p className="mt-4">
                Don't have an account? 
                <button onClick={() => navigate('/register')} className=" hover:underline ml-2">Register</button>
            </p>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (username.length < 3 || password.length < 6) {
            setError('Username must be at least 3 characters and password must be at least 6 characters long.');
            return;
        }

        try {
            await axios.post('/users/register', { username, password });
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setError('Registration failed!');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Register</h1>
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
                    Register
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
            <p className="mt-4">
                Already have an account? 
                <button onClick={() => navigate('/login')} className=" hover:underline ml-2">Login</button>
            </p>
        </div>
    );
};

export default Register;

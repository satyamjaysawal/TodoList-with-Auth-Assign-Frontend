import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:5000/api',
    // baseURL: process.env.REACT_APP_API_BASE_URL,
    baseURL: 'https://todolist-with-auth-assign-backend.onrender.com/api'
});

export default instance;

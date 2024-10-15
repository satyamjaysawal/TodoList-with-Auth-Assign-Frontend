import React from 'react';
import './styles.css';


import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoList from './components/TodoList';
import TodoEdit from './components/TodoEdit';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                    path="/todos" 
                    element={<ProtectedRoute element={TodoList} />} 
                />
                <Route 
                    path="/edit/:id" 
                    element={<ProtectedRoute element={TodoEdit} />} 
                />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;


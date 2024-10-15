import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element }) => {
    const token = localStorage.getItem('token'); // Check for token

    return token ? <Element /> : <Navigate to="/login" />; // Redirect if no token
};

export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteHome = ({ children }) => {
    const token = localStorage.getItem('Token');

    if (!token) {
        
        return <Navigate to="/" replace />;
    }

   
    return children;
};


const ProtectedRouteLogin = ({ children }) => {
    const token = localStorage.getItem('Token');

    if (token) {
        
        return <Navigate to="/home" replace />;
    }

   
    return children;
};

export {ProtectedRouteHome, ProtectedRouteLogin};

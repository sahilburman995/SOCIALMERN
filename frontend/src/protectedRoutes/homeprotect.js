import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    console.log('Before getting authToken');
    const authToken = localStorage.getItem('authToken');
    console.log('After getting authToken:', authToken);
   
  if (!authToken) {
    // Use the navigate function to redirect to "/"
    navigate('/', { replace: true });
    return null; // or you can render a loading state or a different component
  }

  return element;

};

export default ProtectedRoute;

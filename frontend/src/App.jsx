import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register.jsx';
import Home from './Home.jsx'; // Import your other components for different routes
import About from './About.jsx';
import ProtectedRoute from './protectedRoutes/homeprotect.js';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './pages/userProfile.jsx';

function App() {
  return (
    <Router>
     <ToastContainer />
      <Routes>
        <Route path="/" element={<Register />} />
       
        <Route path="/Home" element={<ProtectedRoute element={<Home />} />} />

        <Route path="/about" element={<About />} />
        <Route path="/profile/:username" element={<UserProfile />} />

      </Routes>
    </Router>
  );
}

export default App;

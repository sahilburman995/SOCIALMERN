import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';
import PhotoUpload from './protectedRoutes/PhotoUpload.jsx';
import PostForm from './pages/PostForm.jsx';
function Home() {
  // State to store user details
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Axios GET request to fetch user details
    axios.get('http://localhost:3000/api/userdetails')
      .then(response => {
        // Set the fetched user details to the state
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <>
      <nav className="navbar">
      
      <div className="llogo" style={{ color: 'white' }}>
  <Link to="/Home">SocialApp</Link>
</div>
        <ul className="nav-links">
      
          <li><Link to="/about">About</Link></li>
          <li><Link to="/">Register</Link></li>
        </ul>
      </nav>
      <PhotoUpload/>
      <PostForm/>
      <div className="user-details" style={{ width: '50%', textAlign: 'center', marginLeft: '20%' }}>
      
        <h2>User Details</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {users.map(user => (
            <div key={user._id} className="user-card">
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Occupation: {user.occupation}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

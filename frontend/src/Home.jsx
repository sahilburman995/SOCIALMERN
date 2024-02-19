import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';
import myimg from './assets/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg';
import PostForm from './pages/PostForm.jsx';
///import About from './About.jsx';
import PhotoUpload from './protectedRoutes/PhotoUpload.jsx';
import { toast } from 'react-toastify';
function Home() {
  // State to store user details
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [image, setImage] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/image?page=${page}`);
      const newData = response.data.images;
      setImage(prevImages => [...prevImages, ...newData]);
      setLoading(false);
      setPage(prevPage => prevPage + 1);
      setHasMore(newData.length > 0);
    };

    if (!loading && hasMore) {
      fetchData();
    }
  }, [page, loading, hasMore]); // Only run the effect when these dependencies change

  const lastImageRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    }, { threshold: 0.1 });

    if (lastImageRef.current) {
      observer.observe(lastImageRef.current);
    }

    return () => {
      if (lastImageRef.current) {
        observer.unobserve(lastImageRef.current);
      }
    };
  }, [hasMore]);

  const Addfriend = (user) => {
    const { username, occupation ,userId} = user;
    setFriends([...friends, { username, occupation,userId }]);
   toast.success(`${username}  has Added to your friend list`);
    
  }

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
      <PhotoUpload />
      <button onClick={() => setSidebarOpen(true)}>Open Sidebar</button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2>Friends</h2>
        <ul>
          {friends.map(friend => (
            <li key={friend.username}>{friend.username}</li>
          ))}
        </ul>
        <button onClick={() => { console.log("Closing sidebar"); setSidebarOpen(false); }}>Close Sidebar</button>
      </div>

      <div className='postform'>
        <PostForm />
      </div>

      <div className="user-details" style={{ width: '80%', margin: '0 auto' }}>
        <h2>Do you want to connect</h2>
        <div className="user-cards">
          {users.map(user => (
            <div key={user._id}   className="user-card">
            <Link to={`/profile/${user.username}`} className="profile-link">
              <img src={myimg} alt="Profile" />
              <div className="user-info">
             
                <p className="username">Name: {user.username}</p>
                <p className="occupation">Work: {user.occupation}</p>
              </div>
              </Link>
              <button style={{ backgroundColor: '#46316b' }} onClick={() => Addfriend(user)} className="add-friend-btn">Add Friend</button>
            </div>
          ))}
        </div>
        <div className='about'>
          <div className="gallery-container">
            <div className="gallery">
              {image.map((image, index) => {
                if (index === image.length - 1) {
                  return (
                    <div key={index} ref={lastImageRef}>
                      <img src={`http://localhost:3000/uploads/${image}`} alt={`Image ${index}`} className="gallery-image" />
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                    
                      <img src={`http://localhost:3000/uploads/${image}`} alt={`Image ${index}`} className="gallery-image" />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

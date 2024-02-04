import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css'
import Post from './pages/post';
function About() {
  const [users, setUsers] = useState([]);
   const[image,setImage]=useState([]);

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


      axios.get('http://localhost:3000/image')
      .then(response=>{
        console.log('Response data:', response.data); 
        console.log(response.data.images);
        setImage(response.data.images);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []); 
  return (
    <div>

     <nav className="navbar">
        <div className="logo">
          <Link to="/Home">SocialApp</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/">Register</Link></li>
        </ul>
      </nav>
      <h2>About Page</h2>

    <div className="facebook-layout">
      <header>
        {/* Facebook Header */}
        <h1>MySocial</h1>
      </header>

      <div className="content-container">
        {/* Sidebar */}
        <div className="sidebar">
          <p>Profile</p>
          <p>News Feed</p>
          <p>Friends</p>
          <p>Groups</p>
          {/* Add more sidebar items as needed */}
        </div>

        {/* News Feed */}
        <div className="news-feed">
          {/* News Feed Content */}
          <div className="post">

          {users.map((post, index) => (
            <Post
          key={index}
          userName={post.username}
          postDate={post.date} // Replace with actual date field from your API
          content={post.content}
          imageUrl={post.imageUrl} // Add the image URL field from your API
        />
          ))}
      {/* <Post userName="John,,b; Doe" postDate="January 20, 2022" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." /> */}
          </div>
          {/* Add more posts as needed */}
        </div>

        {/* Chat */}
        <div className="chat">
          <h2>Chat</h2>
          {image.map((imageName, index) => (
            <img key={index} src={`http://localhost:3000/uploads/${imageName}`}    className="small-image"  alt={`Image ${index}`} />
  ))}
          {/* List of chat contacts */}
          <div className="chat-contact">
            <p>Friend 1</p>
          </div>
          {/* Add more chat contacts as needed */}
        </div>
      </div>
    </div>
  );


      {/* Add your about page content here */}
    </div>
  );
}

export default About;

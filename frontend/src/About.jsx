import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';
import Post from './pages/post';
import Chats from './pages/chats';
import AddFriendForm from './components/AddFriendForm';

function About() {
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState([]);
  const [friends, setFriends] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get('http://localhost:3000/api/posts');
        const friendsResponse = await axios.get('http://localhost:3000/api/friends');
        const imageResponse = await axios.get('http://localhost:3000/image');

       setPosts(postsResponse.data);
        setFriends(friendsResponse.data);
        setImage(imageResponse.data.images);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = async () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        // Load more posts when user reaches near the bottom of the page
     
        console.log('Fetching more posts...');
        try {
          const newPostsResponse = await axios.get('http://localhost:3000/api/posts'); // Fetch new posts
     
          const newPosts = newPostsResponse.data;
          setPosts(prevPosts => [...prevPosts, ...newPosts]); // Add new posts to the existing list
   
        } catch (error) {
          console.error('Error fetching more posts:', error);
        }
      }
      setScrollPosition(scrollTop);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='maincontainer'>
      <nav className="navbar">
        <div className="logo">
          <Link to="/Home">SocialApp</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/">Register</Link></li>
        </ul>
      </nav>
      

      <div className="facebook-layout">
       

        <div className="content-container">
          <div className="sidebara">
            <Chats />
            <AddFriendForm />
            <div className="friends-list">
              <h3>Friends</h3>
              <ul>
                {friends.map((friend, index) => (
                  <li style={{ listStyle: 'none' }} key={index} onClick={() => handleFriendSelection(friend.id)}>
                    {friend.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="news-feed">
            <div className="post">
              {posts.map((post, index) => (
                <Post
                  key={index}
                  userName={post.title}
                  postDate={post.date}
                  content={post.content}
                  imageUrl={post.photo}
                />
              ))}
            </div>
          </div>

          <div className="chat">
            <h2>Chat</h2>
            {image.map((imageName, index) => (
              <img key={index} src={`http://localhost:3000/uploads/${imageName}`} className="small-image" alt={`Image ${index}`} />
            ))}
            <div className="chat-contact">
              <p>Friend 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

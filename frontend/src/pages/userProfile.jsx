
// UserProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './userprofile.css';
import myimg from '../assets/cadentlake65026_Old_man_in_the_woods_tired_and_writing_in_a_boo_2727c439-5a73-4f2c-8c47-916f98feef5b.webp';
import myimg2 from '../assets/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg';
function UserProfile() {
    const { username } = useParams();
    
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:3000/api/userdetails/${username}`);
                setUser(userResponse.data);
                const postsResponse = await axios.get(`http://localhost:3000/api/posts`);
                setPosts(postsResponse.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <div className="profile-header">
                <img src={myimg} alt="Profile Cover" className="cover-image" />
                <img src={myimg2} alt="Profile Picture" className="profile-image" />
                <h2>{user.username}</h2>
                <p>{user.occupation}</p>
                {/* Add social links here */}
            </div>
            <div className="profile-body">
                <h3>About Me</h3>
                <p>{user.bio}</p>
                <h3>Posts</h3>
                <div className="post-list">
                    {posts.map(post => (
                        <div key={post._id} className="post">
                            <h4>{post.title}</h4>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;

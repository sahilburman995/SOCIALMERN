// Post.js
import React from 'react';
import './Post.css';

const Post = ({ userName, postDate, content }) => {
  return (
    <div className="post-container">
      <div className="post-header">
        <img src="user-avatar.jpg" alt="User Avatar" className="user-avatar" />
        <div className="post-info">
          <h2>{userName}</h2>
          <p>{postDate}</p>
        </div>
      </div>

      <div className="post-content">
        <p>{content}</p>
      </div>

      <div className="post-actions">
        <button className="like-button">Like</button>
        <button className="comment-button">Comment</button>
        <button className="share-button">Share</button>
      </div>
    </div>
  );
};

export default Post;

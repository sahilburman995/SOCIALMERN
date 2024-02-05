// Post.js
import React from 'react';
import './Post.css';

const Post = ({ userName, postDate, content,imageUrl }) => {
const myimage=`http://localhost:3000/${imageUrl}`;
console.log(myimage);
  console.log("my image is",imageUrl);
  return (
    <div className="post-container">
              
       
       <h2>{userName}</h2>
         
          <p>{postDate}</p>
       
          <img src={myimage} alt="User Avatar" className="user-avatar" />
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

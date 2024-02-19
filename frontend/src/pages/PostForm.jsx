// Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
  // State for form fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(''); // Assuming the photo is a file input

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object to send files
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('photos', photo);

      // Send a POST request to your backend API endpoint
      const response = await axios.post('http://localhost:3000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response as needed (e.g., show a success message)
      alert('post uploaded');
      setTitle('')
      setContent('')
      setPhoto('');
      console.log('Post created successfully:', response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error creating post:', error.message);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form action='/api/photos' style={{backgroundColor:'#f0f6fa'}} method='POST' onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />

        <label>Photo:</label>
        <input type="file"  name='photos' onChange={(e) => setPhoto(e.target.files[0])} />

        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
};

export default PostForm;

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);

      const response=await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
     
      // Handle success (you may display a success message or redirect the user)
      console.log('Photo uploaded successfully');
    } catch (error) {
      // Handle error (display an error message or perform additional actions)
      console.error('Error uploading photo:', error);
    }
  };

  return (
    //note bhai jab bhi form bna rhe ho to onsubmit krna padega agar button ko onclck krke trigger karwaoge to nhi hoga 
    <form  action='/upload' method='POST' onSubmit={handleUpload}  encType='multipart/form-Data'> 
      <input type="file" name ="photo" onChange={handleFileChange} />
      <button type='submit'>Upload Photo</button>
      </form>
  );
};

export default PhotoUpload;

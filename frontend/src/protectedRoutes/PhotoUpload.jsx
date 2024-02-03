import React, { useState } from 'react';
import axios from 'axios';

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);

      const response=await axios.post('http://localhost:3000/api/uploadPhoto', formData, {
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
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Photo</button>
    </div>
  );
};

export default PhotoUpload;

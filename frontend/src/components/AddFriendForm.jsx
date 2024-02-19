import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddFriendForm = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const handleIdChange = (event) => { 
    setId(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/friends', { id, name });
      console.log('Friend added successfully.');
      // Clear input fields after successful submission
      setId('');
      setName('');
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      {/* <div>
        <label htmlFor="friendId">Friend ID:</label>
        <input
          type="text"
          id="friendId"
          value={id}
          onChange={handleIdChange}
          required
        />
      </div> */}
      <div>
        <label htmlFor="friendName">Friend Name:</label>
        <input
          type="text"
          id="friendName"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <button type="submit">Add Friend</button>
    </form>
  );
};

export default AddFriendForm;

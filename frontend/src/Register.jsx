import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    occupation: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =  async(e) => {
    e.preventDefault();
    // Add your registration logic here
try{
    const response  =  await axios.post('http://localhost:3000/api/userdetails',formData);
  resetFormData();
alert('Regster Successfully')
console.log('Backend response:', response.data);
// Do any additional handling or update UI as needed
} catch (error) {
console.error('Error sending message:', error);
}
};
const resetFormData = () => {
  setFormData({
    username: '',
    email: '',
    password: '',
    occupation: '',
  });
};
   
    // You may want to send this data to a server for registration
  

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Occupaton
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;

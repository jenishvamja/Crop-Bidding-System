import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'farmer', // Default role
    profile: {
      name: '',
      contact: '',
      address: '',
      bio: '',
      expertise: [],
    },
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('profile.')) {
      const profileField = name.split('.')[1];
      setFormData({
        ...formData,
        profile: { ...formData.profile, [profileField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); 
    try {
      await axios.post('http://localhost:5000/api/users/register', formData,{
        headers: {
          'Content-Type': 'application/json',}
        });
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Error during signup, please try again');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
            <option value="expert">Expert</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="profile.name" value={formData.profile.name} onChange={handleChange} />
        </div>
        <div>
          <label>Contact:</label>
          <input type="text" name="profile.contact" value={formData.profile.contact} onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="profile.address" value={formData.profile.address} onChange={handleChange} />
        </div>
        <div>
          <label>Bio:</label>
          <textarea name="profile.bio" value={formData.profile.bio} onChange={handleChange}></textarea>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;

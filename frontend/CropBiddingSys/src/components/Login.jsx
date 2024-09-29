import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/Login', formData);
      
      // Log the full response to debug
      console.log(response.data);
  
      // Assuming the response contains a token and user role
      const { token, role } = response.data;
  
      // Save token to local storage or state management as needed
      localStorage.setItem('token', token);
  
      // Role-based navigation
      if (role === 'farmer') {
        navigate('/WelcomeFarmer');
      } else if (role === 'admin') {
        navigate('/WelcomeAdmin');
      } else if (role === 'expert') {
        navigate('/WelcomeExpert');
      } else if (role === 'buyer') {
        navigate('/WelcomeBuyer');
      } else {
        setError('Invalid user role');
      }
  
    } catch (error) {
      setError(error.response?.data?.message || 'Error during login, please try again');
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <a href="/Signup">Are You a New User?</a>
      </form>
    </div>
  );
};

export default Login;

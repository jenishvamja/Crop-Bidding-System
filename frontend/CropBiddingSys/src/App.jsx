import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import WelcomeFarmer from './WelcomeFarmer';
import WelcomeBuyer from './WelcomeBuyer';
import WelcomeAdmin from './WelcomeAdmin';
import WelcomeExpert from './WelcomeExpert';
import ProfilePage from './components/AddBlog'
import AddBlog from './components/AddBlog';
import BlogPage from './components/Blog';
const routes = (

  <Router>
    <Routes>
      {/* Login and Signup*/}
      <Route path="/" exact element={<Login />} />/
      <Route path="/Signup" exact element={<Signup />} />

      {/* Welcome Pages */}
      <Route path="/WelcomeFarmer" exact element={<WelcomeFarmer />} />
      <Route path="/WelcomeBuyer" exact element={<WelcomeBuyer />} />
      <Route path="/WelcomeAdmin" exact element={<WelcomeAdmin />} />
      <Route path="/WelcomeExpert" exact element={<WelcomeExpert />} />

      {/*Profile page*/}
      <Route path="/AddBlog" exact element={<AddBlog />} />
      <Route path="/Blog" exact element={<BlogPage />} />

          
    </Routes>
  </Router>
);
const App = () => {
  return <div>{routes}</div>;
}
export default App
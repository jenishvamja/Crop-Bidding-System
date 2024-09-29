const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have the User model defined as per your schema

const userRegistration = async (req, res) => {
  console.log('Received data:', req.body);
  const { username, email, password, password_confirmation, role, profile } = req.body;
  
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ status: 'failed', message: 'Email already exists' });
    }

    if (username && email && password && password_confirmation && role) {
      if (password !== password_confirmation) {
        return res.status(400).send({ status: 'failed', message: "Password and Confirm Password don't match" });
      }

      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashPassword,
        role,
        profile: {
          name: profile.name,
          contact: profile.contact,
          address: profile.address,
          bio: profile.bio || '',
          expertise: role === 'expert' ? profile.expertise : []
        },
        registration_date: new Date()
      });

      await newUser.save();

      // Generate JWT token
      const token = jwt.sign({ userID: newUser._id, role: newUser.role }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });

      return res.status(201).send({ status: 'success', message: 'Registration Successful', token });
    } else {
      return res.status(400).send({ status: 'failed', message: 'All fields are required' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'failed', message: 'Unable to Register', error: error.message });
  }
};
// const userLogin = async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       if (!email || !password) {
//         return res.status(400).send({ status: 'failed', message: 'All fields are required' });
//       }
  
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).send({ status: 'failed', message: 'User not registered' });
//       }
  
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).send({ status: 'failed', message: 'Invalid credentials' });
//       }
  
//       // Generate JWT token
//       const token = jwt.sign({ userID: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
  
//       return res.status(200).send({ status: 'success', message: 'Login successful', token ,role:user.role});
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send({ status: 'failed', message: 'Unable to login', error: error.message });
//     }
//   };

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send({ status: 'failed', message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ status: 'failed', message: 'User not registered' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ status: 'failed', message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userID: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });

    // Send the role along with the token in the response
    return res.status(200).send({
      status: 'success',
      message: 'Login successful',
      token,
      role: user.role // Include the user's role in the response
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'failed', message: 'Unable to login', error: error.message });
  }
};

  const changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({ "status": "failed", "message": "New Password and Confirm New Password don't match" });
      } else {
        try {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          await User.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } });
          res.send({ "status": "success", "message": "Password changed successfully" });
        } catch (error) {
          console.log(error);
          res.send({ "status": "failed", "message": "Unable to change password" });
        }
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" });
    }
  };
  
  // Function to get all users
const getAllUsers = async (req, res) => {
  try {
      const users = await User.find(); // Assuming you're using Mongoose
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
  }
};

module.exports ={
    userRegistration,
    userLogin,
    changeUserPassword,
    getAllUsers
}  
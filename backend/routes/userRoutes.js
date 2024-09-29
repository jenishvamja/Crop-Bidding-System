const express = require('express');
const router = express.Router();
const { userRegistration, userLogin, changeUserPassword, getAllUsers } = require('../controllers/userController');
const checkUserAuth = require('../middleware/auth-middleware');

// Public routes
router.post('/register', userRegistration);
router.post('/login', userLogin);

// Protected routes
router.use(checkUserAuth); // Apply middleware to all subsequent routes
router.post('/changepassword', changeUserPassword);
router.get('/users', getAllUsers); // Example of a protected route

module.exports = router;

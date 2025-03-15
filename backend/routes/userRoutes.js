const express = require('express');
const router = express.Router();
const User = require('../models/userModel');  // Assuming you have a User model

// // Create a new user (example)
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if the user already exists
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     const newUser = new User({ name, email, password });

//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (error) {
//     console.log(error); // Log the error for debugging
//     res.status(500).json(error);
//   }
// });


// Get all users (example)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID (example)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);  // Fetch user by ID
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user (example)
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user (example)
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;

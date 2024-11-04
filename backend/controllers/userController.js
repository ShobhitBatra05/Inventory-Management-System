const User = require('../models/User');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const newUser = new User({ name, email, password, role });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: 'Error adding user', error });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
      const { name, email, role, isActive } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, role, isActive },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: 'Error updating user', error });
    }
};


// Delete a user
exports.deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting user', error });
    }
};

// Change user role
exports.changeUserRole = async (req, res) => {
    try {
      const { role } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: 'Error changing user role', error });
    }
};


// Toggle user status (active/inactive)
exports.toggleUserStatus = async (req, res) => {
    try {
      const { isActive } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { isActive },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: 'Error toggling user status', error });
    }
};
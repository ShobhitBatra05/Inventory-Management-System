const express = require('express');
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  changeUserRole,
  toggleUserStatus
} = require('../controllers/userController');

const router = express.Router();

// Routes for user management
router.get('/', getUsers);                // GET all users
router.post('/', addUser);                // POST add a new user
router.put('/:id', updateUser);           // PUT update a user
router.delete('/:id', deleteUser);        // DELETE a user
router.patch('/:id/role', changeUserRole); // PATCH change user role
router.patch('/:id/status', toggleUserStatus); // PATCH toggle user status

module.exports = router;
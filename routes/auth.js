const express = require('express');
const router = express.Router();
const { login, updateUserStatus } = require('../controllers/authController');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateUserCreate, validateUserUpdate } = require('../middleware/validator');

router.post('/login', login);
router.get('/users', authMiddleware, getUsers);
router.post('/users', [authMiddleware, validateUserCreate], createUser);
router.put('/users/:id', [authMiddleware, validateUserUpdate], updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);
router.put('/users/:id/status', authMiddleware, updateUserStatus);

module.exports = router; 
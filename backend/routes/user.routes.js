const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAllUsers } = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authenticate, authorize('ADMIN'), getAllUsers);

module.exports = router;
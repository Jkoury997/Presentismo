// routes/userRoutes.js
const express = require('express');
const { register, login, logout, revokeAllTokens } = require('../controllers/userController');
const { validateRegister, validateLogin } = require('../validators/userValidator');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', verifyToken, logout);
router.post('/revoke', verifyToken, revokeAllTokens);

module.exports = router;

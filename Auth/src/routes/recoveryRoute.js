const express = require('express');
const { requestOtp, resetPassword } = require('../controllers/otpController');
const router = express.Router();

router.post('/request-otp', requestOtp);
router.post('/reset-password', resetPassword);

module.exports = router;
const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const validateRequest = require('../middlewares/validateRequest');
const { validateAttendance} = require('../validators/attendanceValidator');
const { verifyToken } =require ('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/register-attendance',
  validateAttendance,
  validateRequest,
  verifyToken,
  attendanceController.registerAttendance
);



module.exports = router;

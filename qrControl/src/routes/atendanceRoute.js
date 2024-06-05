const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const validateRequest = require('../middlewares/validateRequest');
const { validateAttendance} = require('../validators/attendanceValidator');

const router = express.Router();

router.post(
  '/register-attendance',
  validateAttendance,
  validateRequest,
  attendanceController.registerAttendance
);

router.post('/close-automatic-sessions', attendanceController.closeAutomaticSessions);

module.exports = router;

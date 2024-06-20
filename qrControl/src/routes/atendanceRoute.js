const { verifyToken,authorizeRoles } = require('../middlewares/authMiddleware');

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

router.put(
  '/update-attendance/:id',
  verifyToken,
  authorizeRoles('admin', 'recursos_humanos'),
  attendanceController.updateAttendance
);



module.exports = router;

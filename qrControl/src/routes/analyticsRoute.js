const express = require('express');
const analyticsController = require('../controllers/analyticsController');
const validateRequest = require('../middlewares/validateRequest');
const { validateUserUUID, validateDateRange } = require('../validators/analyticsValidator');

const router = express.Router();

// Obtener asistencia por usuario
router.get(
  '/user/:useruuid',
  validateUserUUID,
  validateRequest,
  analyticsController.getAttendanceByUser
);

// Obtener asistencia por usuario y rango de fechas
router.get(
  '/user/:useruuid/date-range',
  [...validateUserUUID, ...validateDateRange],
  validateRequest,
  analyticsController.getAttendanceByUserAndDateRange
);

// Obtener asistencia de todos los empleados por rango de fechas
router.get(
  '/date-range',
  validateDateRange,
  validateRequest,
  analyticsController.getAttendanceByDateRange
);

module.exports = router;

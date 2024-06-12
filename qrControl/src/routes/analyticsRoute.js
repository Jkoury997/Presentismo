const express = require('express');
const analyticsController = require('../controllers/analyticsController');
const validateRequest = require('../middlewares/validateRequest');
const { validateUserUUID, validateDateRange } = require('../validators/analyticsValidator');
const { verifyToken,authorizeRoles,authorizeRolesOrSelf } =require ('../middlewares/authMiddleware');

const router = express.Router();

// Obtener asistencia por usuario
router.get(
  '/user/:useruuid',
  validateUserUUID,
  validateRequest,
  verifyToken,
  authorizeRolesOrSelf('admin', 'recursos_humanos'),
  analyticsController.getAttendanceByUser
);

// Obtener asistencia por usuario y rango de fechas
router.get(
  '/user/:useruuid/date-range',
  [...validateUserUUID, ...validateDateRange],
  validateRequest,
  verifyToken,
  authorizeRolesOrSelf('admin', 'recursos_humanos'),
  analyticsController.getAttendanceByUserAndDateRange
);

// Obtener asistencia de todos los empleados por rango de fechas
router.get(
  '/date-range',
  validateDateRange,
  validateRequest,
  verifyToken,
  authorizeRoles('admin', 'recursos_humanos'),
  analyticsController.getAttendanceByDateRange
);

module.exports = router;

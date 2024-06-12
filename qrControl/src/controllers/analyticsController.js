const analysisService = require('../services/analyticsService');
const logger = require('../utils/logger');

// Obtener asistencia por usuario
const getAttendanceByUser = async (req, res) => {
  const { useruuid } = req.params;
  console.log(useruuid)

  try {
    const attendanceRecords = await analysisService.getAttendanceByUser(useruuid);
    res.status(200).json(attendanceRecords);
  } catch (error) {
    logger.error('Error fetching attendance for user %s: %o', useruuid, error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener asistencia por usuario y rango de fechas
const getAttendanceByUserAndDateRange = async (req, res) => {
  const { useruuid } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const attendanceRecords = await analysisService.getAttendanceByUserAndDateRange(useruuid, startDate, endDate);
    res.status(200).json(attendanceRecords);
  } catch (error) {
    logger.error('Error fetching attendance for user %s between %s and %s: %o', useruuid, startDate, endDate, error);
    res.status(500).json({ error: error.message });
  }
};

// Obtener asistencia de todos los empleados por rango de fechas
const getAttendanceByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const attendanceRecords = await analysisService.getAttendanceByDateRange(startDate, endDate);
    res.status(200).json(attendanceRecords);
  } catch (error) {
    logger.error('Error fetching attendance between %s and %s: %o', startDate, endDate, error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAttendanceByUser,
  getAttendanceByUserAndDateRange,
  getAttendanceByDateRange
};

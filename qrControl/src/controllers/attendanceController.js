const attendanceService = require('../services/attendanceService');
const logger = require('../utils/logger');

const registerAttendance = async (req, res) => {
  const { code, location } = req.body;
  const io = req.app.get('socketio'); // Obtener io desde la aplicación

  try {
    const result = await attendanceService.registerAttendance(code, location, io); // Pasar io como parámetro
    logger.info('Attendance action for code %s from location %s', code, location);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error handling attendance for code %s from location %s: %o', code, location, error);
    res.status(500).json({ error: error.message });
  }
};

const closeAutomaticSessions = async (req, res) => {
  try {
    const closedSessions = await attendanceService.closeAutomaticSessions();
    logger.info('Closed %d automatic sessions', closedSessions.length);
    res.status(200).json(closedSessions);
  } catch (error) {
    logger.error('Error closing automatic sessions: %o', error);
    res.status(500).json({ error: error.message });
  }
};

const updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { entryTime, exitTime, modifiedBy } = req.body;

  try {
    const updatedAttendance = await attendanceService.updateAttendance(id, entryTime, exitTime, modifiedBy);
    logger.info('Attendance updated for id %s by user %s', id, modifiedBy);
    res.status(200).json(updatedAttendance);
  } catch (error) {
    logger.error('Error updating attendance for id %s by user %s: %o', id, modifiedBy, error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerAttendance,
  closeAutomaticSessions,
  updateAttendance
};
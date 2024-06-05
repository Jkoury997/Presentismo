const cron = require('node-cron');
const attendanceService = require('../services/attendanceService');

// Programar cierre automático cada hora
cron.schedule('0 * * * *', async () => {
  console.log('Running closeAutomaticSessions job');
  try {
    const closedSessions = await attendanceService.closeAutomaticSessions();
    console.log('Closed sessions:', closedSessions.length);
  } catch (error) {
    console.error('Error running closeAutomaticSessions job:', error);
  }
});

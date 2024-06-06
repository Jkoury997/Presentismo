const Attendance = require('../database/models/Attendace');
const QRCode = require('../database/models/QRCode');
const { sendNotification } = require('./notificationService'); // Importa la función de notificaciones

const TIME_INTERVAL = 1 * 60 * 1000; // 1 minuto

const registerAttendance = async (code, location) => {
  try {
    const currentTime = new Date();

    // Verificar si el código QR es válido y obtener el useruuid
    const qrCode = await QRCode.findOne({ code });
    if (!qrCode) {
      console.error(`Invalid QR code: ${code}`);
      throw new Error('Invalid QR code');
    }

    const { useruuid, deviceUUID } = qrCode;
    console.log(`QR code valid: useruuid=${useruuid}, deviceUUID=${deviceUUID}`);

    // Verificar si el usuario ya tiene una sesión abierta
    const existingAttendance = await Attendance.findOne({ useruuid, deviceUUID, exitTime: null });

    if (existingAttendance) {
      const lastEntryTime = new Date(existingAttendance.entryTime);
      console.log(`Existing attendance found: useruuid=${useruuid}, entryTime=${lastEntryTime}`);

      // Verificar el intervalo de tiempo mínimo entre las lecturas
      if (currentTime - lastEntryTime < TIME_INTERVAL) {
        console.error(`Cannot register another entry/exit within 1 minute for useruuid=${useruuid}`);
        throw new Error('Cannot register another entry/exit within 1 minute');
      }

      // Registrar la salida
      existingAttendance.exitTime = currentTime;
      await existingAttendance.save();
      console.log(`Exit registered successfully for useruuid=${useruuid} at ${currentTime}`);
      
      // Enviar notificación
      sendNotification(useruuid, 'Your exit has been registered successfully');
      
      return { message: 'Exit registered successfully', useruuid, entryTime: existingAttendance.entryTime, exitTime: currentTime };
    } else {
      // Registrar la entrada
      const attendance = new Attendance({
        useruuid,
        deviceUUID,
        entryTime: currentTime,
        location,
      });

      await attendance.save();
      console.log(`Entry registered successfully for useruuid=${useruuid} at ${currentTime}`);
      
      // Enviar notificación
      sendNotification(useruuid, 'Your entry has been registered successfully');
      
      return { message: 'Entry registered successfully', useruuid, entryTime: currentTime };
    }
  } catch (error) {
    console.error('Error registering attendance:', error);
    throw new Error('Error registering attendance');
  }
};

// Cerrar sesiones abiertas automáticamente después de 14 horas
const closeAutomaticSessions = async () => {
  const threshold = new Date(Date.now() - 14 * 60 * 60 * 1000);

  // Buscar todas las sesiones abiertas que superen las 14 horas
  const sessionsToClose = await Attendance.find({ entryTime: { $lt: threshold }, exitTime: null });

  for (const session of sessionsToClose) {
    session.exitTime = new Date(session.entryTime.getTime() + 14 * 60 * 60 * 1000);
    session.closedAutomatically = true;
    await session.save();
  }

  return sessionsToClose;
};

module.exports = {
  registerAttendance,
  closeAutomaticSessions,
};

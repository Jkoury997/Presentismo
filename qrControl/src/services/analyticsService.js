const Attendance = require('../database/models/Attendace');

const getAttendanceByUser = async (useruuid) => {
  return await Attendance.find({ useruuid }).sort({ entryTime: -1 }); // Ordenar por tiempo de entrada descendente
};

const getAttendanceByUserAndDateRange = async (useruuid, startDate, endDate) => {
  return await Attendance.find({
    useruuid,
    entryTime: { $gte: new Date(startDate), $lt: new Date(endDate) }
  }).sort({ entryTime: -1 });
};

const getAttendanceByDateRange = async (startDate, endDate) => {
  return await Attendance.find({
    entryTime: { $gte: new Date(startDate), $lt: new Date(endDate) }
  }).sort({ entryTime: -1 });
};

module.exports = {
  getAttendanceByUser,
  getAttendanceByUserAndDateRange,
  getAttendanceByDateRange
};

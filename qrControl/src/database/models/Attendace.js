const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  useruuid: { type: String, required: true },
  deviceUUID: { type: String, required: true },
  entryTime: { type: Date, required: true },
  exitTime: { type: Date },
  closedAutomatically: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
  location: { type: String, required: true },
});

module.exports = mongoose.model('Attendance', attendanceSchema);

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  useruuid: { type: String, required: true },
  deviceUUID: { type: String, required: true },
  entryTime: { type: Date, required: true },
  exitTime: { type: Date },
  closedAutomatically: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
  location: { type: String, required: true },
  modifiedBy: { type: String }, // Para almacenar el uuid de quien hizo la modificación
  modifiedEntryTime: { type: Date }, // Para almacenar el entryTime modificado
  modifiedExitTime: { type: Date }, // Para almacenar el exitTime modificado
});

// Middleware pre-save para registrar las modificaciones
attendanceSchema.pre('save', function(next) {
  if (this.isModified('entryTime') && !this.modifiedEntryTime) {
    this.modifiedEntryTime = this.entryTime;
  }
  if (this.isModified('exitTime') && !this.modifiedExitTime) {
    this.modifiedExitTime = this.exitTime;
  }
  next();
});

// Middleware pre-update para registrar las modificaciones
attendanceSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();

  if (update.$set) {
    if (update.$set.entryTime) {
      update.$set.modifiedEntryTime = update.$set.entryTime;
      delete update.$set.entryTime; // Mantener entryTime intacto
    }
    if (update.$set.exitTime) {
      update.$set.modifiedExitTime = update.$set.exitTime;
      delete update.$set.exitTime; // Mantener exitTime intacto
    }
    if (update.$set.modifiedBy) {
      this.set({ modifiedBy: update.$set.modifiedBy });
    }
  }
  
  next();
});

module.exports = mongoose.model('Attendance', attendanceSchema);

const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  useruuid: { type: String, required: true },
  deviceUUID: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: '30s' }, // El código expira en 15 segundos
});

module.exports = mongoose.model('QRCode', qrCodeSchema);

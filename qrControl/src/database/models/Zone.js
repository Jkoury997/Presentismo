const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const zoneSchema = new mongoose.Schema({
  uuid: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  deviceUUID: { type: String, default: '' }, // Agregamos el deviceUUID
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Zone', zoneSchema);

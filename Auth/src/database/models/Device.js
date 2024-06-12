const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  useruuid: { type: String, required: true },
  uuid: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Device', deviceSchema);
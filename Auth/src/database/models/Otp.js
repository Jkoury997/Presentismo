const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const otpSchema = new mongoose.Schema({
    otp: { type: String, required: true },
    userUuid: { type: String, required: true },
    email: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    uuid: { type: String, default: uuidv4, unique: true }
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
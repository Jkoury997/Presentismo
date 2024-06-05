const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const tokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    userUuid: { type: String, required: true },
    ip: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
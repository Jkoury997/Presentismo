const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
  userUUID: { type: String, required: true, unique: true },
  roles: [{ type: String, enum: ['admin', 'employed', 'recursos_humanos'], required: true }]
});

const UserRole = mongoose.model('UserRole', userRoleSchema);

module.exports = UserRole;
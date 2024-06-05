const { body } = require('express-validator');

const validateAttendance = [
  body('code').isString().notEmpty().withMessage('Code is required and must be a string'),
  body('location').isString().notEmpty().withMessage('Location is required and must be a string'),
];

module.exports = {
  validateAttendance,
};
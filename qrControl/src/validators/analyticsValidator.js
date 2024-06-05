const { param, query } = require('express-validator');

const validateUserUUID = [
  param('useruuid').isString().notEmpty().withMessage('User UUID is required')
];

const validateDateRange = [
  query('startDate').isISO8601().withMessage('Start date is required and must be a valid date'),
  query('endDate').isISO8601().withMessage('End date is required and must be a valid date')
];

module.exports = {
  validateUserUUID,
  validateDateRange
};

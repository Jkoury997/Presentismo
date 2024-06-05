const { body } = require('express-validator');

const validateZoneCreation = [
  body('name').isString().notEmpty().withMessage('Zone name is required'),
  body('description').optional().isString().withMessage('Description must be a string')
];

const validateZoneUpdate = [
  body('name').isString().notEmpty().withMessage('Zone name is required'),
  body('description').optional().isString().withMessage('Description must be a string')
];

module.exports = {
  validateZoneCreation,
  validateZoneUpdate
};

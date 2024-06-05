const express = require('express');
const deviceController = require('../controllers/deviceController');

const router = express.Router();

router.get('/:uuid', deviceController.getDevice);

module.exports = router;
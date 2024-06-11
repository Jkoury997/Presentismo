const express = require('express');
const deviceController = require('../controllers/deviceController');

const router = express.Router();

router.get('/:uuid', deviceController.getDevice);
router.post('/request-otp', deviceController.requestDeviceUpdateOtp);
router.put('/update-with-otp', deviceController.updateDeviceWithOtp);

module.exports = router;
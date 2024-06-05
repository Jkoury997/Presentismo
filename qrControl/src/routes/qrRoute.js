const express = require('express');
const qrController = require('../controllers/qrController');

const router = express.Router();

router.post('/generate-qr', qrController.generateQRCode);


module.exports = router;

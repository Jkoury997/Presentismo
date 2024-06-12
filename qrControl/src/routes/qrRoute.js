const { verifyToken } =require ('../middlewares/authMiddleware');

const express = require('express');
const qrController = require('../controllers/qrController');

const router = express.Router();

router.post('/generate-qr',verifyToken, qrController.generateQRCode);


module.exports = router;

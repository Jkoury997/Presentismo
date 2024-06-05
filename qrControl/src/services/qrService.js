const QRCodeModel = require('../database/models/QRCode');
const { v4: uuidv4 } = require('uuid');

async function generateQRCode(useruuid, deviceUUID) {
  try {
    const code = uuidv4(); // Genera un código único

    // Guarda el código QR en la base de datos
    const qrCode = new QRCodeModel({
      useruuid,
      deviceUUID,
      code
    });
    await qrCode.save();

    return code;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Error generating QR code');
  }
}

module.exports = {
  generateQRCode
};

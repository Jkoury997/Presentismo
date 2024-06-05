const qrService = require('../services/qrService');
const { fetchUser, fetchDevice } = require('../utils/consultData');

async function generateQRCode(req, res) {
  const { useruuid, deviceUUID } = req.body;

  try {
    const user = await fetchUser(useruuid);
    const device = await fetchDevice(deviceUUID, useruuid);

    const code = await qrService.generateQRCode(useruuid, deviceUUID);

    res.status(200).json({ code });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  generateQRCode
};


const deviceService = require('../services/deviceService');


async function getDevice(req, res) {
  try {
    const device = await deviceService.getDevice(req.params.uuid);
    res.status(200).json(device);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getDevice
};

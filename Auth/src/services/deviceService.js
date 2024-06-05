const Device = require('../database/models/Device');


async function getDevice(uuid) {
  const device = await Device.findOne({ uuid },"uuid useruuid");
  if (!device) {
    throw new Error('Device not found');
  }
  return device;
}

module.exports = {
  getDevice
};

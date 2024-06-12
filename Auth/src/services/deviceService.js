const Device = require('../database/models/Device');


async function getDevice(uuid) {
  const device = await Device.findOne({ uuid },"uuid useruuid");
  if (!device) {
    throw new Error('Device not found');
  }
  return device;
}

async function updateDevice(userUuid, newUuid) {
  const device = await Device.findOneAndUpdate({ useruuid: userUuid }, { uuid: newUuid }, { new: true });
  console.log(device)
  if (!device) {
    throw new Error('Device not found');
  }
  return device;
}

module.exports = {
  getDevice,
  updateDevice
};
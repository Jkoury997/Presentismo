const Zone = require('../database/models/Zone');
const { v4: uuidv4 } = require('uuid');

const createZone = async (data) => {
  const zone = new Zone(data);
  await zone.save();
  return zone;
};

const getZones = async () => {
  return await Zone.find();
};

const getZoneById = async (id) => {
  return await Zone.findById(id);
};

const getZoneByUUID = async (uuid) => {
  return await Zone.findOne({ uuid });
};

const updateZone = async (id, data) => {
  return await Zone.findByIdAndUpdate(id, data, { new: true });
};

const deleteZone = async (id) => {
  return await Zone.findByIdAndDelete(id);
};

const linkDeviceToZone = async (zoneUUID) => {
  const zone = await Zone.findOne({ uuid: zoneUUID });
  if (!zone) {
    throw new Error('Zone not found');
  }

  const deviceUUID = uuidv4();
  zone.deviceUUID = deviceUUID;
  await zone.save();

  return deviceUUID;
};
const verifyZoneAndDevice = async (zoneUUID, deviceUUID) => {
  const zone = await Zone.findOne({ uuid: zoneUUID, deviceUUID });
  return !!zone;
};


module.exports = {
  createZone,
  getZones,
  getZoneById,
  getZoneByUUID,
  updateZone,
  deleteZone,
  linkDeviceToZone,
  verifyZoneAndDevice
};

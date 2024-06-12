const zoneService = require('../services/zoneService');
const logger = require('../utils/logger');

const createZone = async (req, res) => {
  console.log(req.body)
  try {
    const zone = await zoneService.createZone(req.body);
    logger.info('Zone created: %s', zone.name);
    res.status(201).json(zone);
  } catch (error) {
    logger.error('Error creating zone: %o', error);
    res.status(500).json({ error: error.message });
  }
};

const getZones = async (req, res) => {
  try {
    const zones = await zoneService.getZones();
    res.status(200).json(zones);
  } catch (error) {
    logger.error('Error fetching zones: %o', error);
    res.status(500).json({ error: error.message });
  }
};

const getZoneByuuid = async (req, res) => {
  console.log(req.params.uuid)
  try {
    const zone = await zoneService.getZoneByUUID(req.params.uuid);
    if (!zone) {
      return res.status(404).json({ error: 'Zone not found' });
    }
    res.status(200).json(zone);
  } catch (error) {
    logger.error('Error fetching zone: %o', error);
    res.status(500).json({ error: error.message });
  }
};

const updateZone = async (req, res) => {
  try {
    const zone = await zoneService.updateZone(req.params.id, req.body);
    if (!zone) {
      return res.status(404).json({ error: 'Zone not found' });
    }
    logger.info('Zone updated: %s', zone.name);
    res.status(200).json(zone);
  } catch (error) {
    logger.error('Error updating zone: %o', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteZone = async (req, res) => {
  try {
    const zone = await zoneService.deleteZone(req.params.id);
    if (!zone) {
      return res.status(404).json({ error: 'Zone not found' });
    }
    logger.info('Zone deleted: %s', zone.name);
    res.status(200).json({ message: 'Zone deleted' });
  } catch (error) {
    logger.error('Error deleting zone: %o', error);
    res.status(500).json({ error: error.message });
  }
};

const linkDeviceToZone = async (req, res) => {
  const { zoneUUID } = req.body;
  console.log(zoneUUID)

  try {
    const deviceUUID = await zoneService.linkDeviceToZone(zoneUUID);
    logger.info('Device linked to zone: %s', zoneUUID);
    res.status(201).json({ deviceUUID });
  } catch (error) {
    logger.error('Error linking device to zone: %o', error);
    res.status(500).json({ error: error.message });
  }
};
const verifyZoneAndDevice = async (req, res) => {
  const { zoneUUID, deviceUUID } = req.body;

  try {
    const valid = await zoneService.verifyZoneAndDevice(zoneUUID, deviceUUID);
    res.status(200).json({ valid });
  } catch (error) {
    logger.error('Error verifying zone and device: %o', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createZone,
  getZones,
  getZoneByuuid,
  updateZone,
  deleteZone,
  linkDeviceToZone,
  verifyZoneAndDevice
};

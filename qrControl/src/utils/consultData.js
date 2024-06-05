
async function fetchUser(useruuid) {
  try {
    const response = await fetch(`${process.env.AUTH_API_URL}/api/user/${useruuid}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Error fetching user');
  }
}

async function fetchDevice(deviceUUID, useruuid) {

  try {
    const response = await fetch(`${process.env.AUTH_API_URL}/api/device/${deviceUUID}`);
    if (!response.ok) {
      throw new Error('Device not found');
    }
    const device = await response.json();
    if (device.useruuid !== useruuid) {
      throw new Error('Device not found');
    }
    return device;
  } catch (error) {
    console.error('Error fetching device:', error);
    throw new Error('Error fetching device');
  }
}

module.exports = {
  fetchUser,
  fetchDevice
};

// services/userService.js
const User = require('../database/models/User');
const Token = require('../database/models/Token');
const Device = require("../database/models/Device")
const UserRole = require('../database/models/UserRole');
const bcrypt = require("bcryptjs")
const { v4: uuidv4 } = require('uuid');

const MAX_FAILED_ATTEMPTS = 3;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutos


const registerUser = async (userData) => {
  const { firstName, lastName, dni, email, password, role = 'employed' } = userData;

  // Verificar si el email o el DNI ya existen
  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
      throw new Error('User with this email already exists');
  }

  const existingUserByDni = await User.findOne({ dni });
  if (existingUserByDni) {
      throw new Error('User with this DNI already exists');
  }

  // Crear un nuevo usuario
  const user = new User({ firstName, lastName, dni, email, password });
  await user.save();

  // Generar un UUID para el dispositivo
  const deviceUUID = uuidv4();

  // Crear un nuevo dispositivo vinculado al usuario
  const device = new Device({ useruuid: user.uuid, uuid: deviceUUID });
  await device.save();

  // Asignar rol al usuario
  const userRole = new UserRole({ userUUID: user.uuid, roles: [role] });
  await userRole.save();

  return { user, deviceUUID };
};

const loginUser = async (email, password, deviceUUID) => {
  const user = await User.findOne({ email });

  if (!user) {
      throw new Error('User not found');
  }

  if (user.lockUntil && user.lockUntil > Date.now()) {
      throw new Error(`Account is locked until ${user.lockUntil}`);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
          user.lockUntil = Date.now() + LOCK_TIME;
          user.failedLoginAttempts = 0;
      }
      await user.save();
      throw new Error('Invalid password');
  }

  user.failedLoginAttempts = 0;
  user.lockUntil = undefined;
  await user.save();

  const device = await Device.findOne({ useruuid: user.uuid, uuid: deviceUUID });
  if (!device) {
      throw new Error('Invalid device');
  }

  // Buscar el rol del usuario
  const userRole = await UserRole.findOne({ userUUID: user.uuid });
  if (!userRole) {
      throw new Error('User role not found');
  }

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return { ...userWithoutPassword, role: userRole.roles[0] }; // Asumiendo que el usuario tiene un solo rol
};

const getClientIp = (req) => {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
        return xForwardedFor.split(',')[0];
    } else if (req.connection && req.connection.remoteAddress) {
        return req.connection.remoteAddress;
    } else if (req.socket && req.socket.remoteAddress) {
        return req.socket.remoteAddress;
    } else if (req.connection && req.connection.socket && req.connection.socket.remoteAddress) {
        return req.connection.socket.remoteAddress;
    } else {
        return 'sin IP'; // Valor predeterminado si no se encuentra ninguna IP
    }
};

const logoutUser = async (refreshToken) => {
    await Token.deleteOne({ token: refreshToken });
};

async function getUserService(uuid) {
    const user = await User.findOne({uuid}, 'email firstName lastName dni uuid');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  
  async function getUserByEmailService(email) {
    const user = await User.findOne({ email },'email firstName lastName dni uuid');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  const updateUser = async (userUuid, updateData) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ uuid: userUuid }, updateData, { new: true, runValidators: true });
        if (!updatedUser) {
            throw new Error('Usuario no encontrado');
        }
        return updatedUser;
    } catch (error) {
        throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
};

const deactivateUser = async (userUuid) => {
    try {
        const user = await User.findOne({ uuid: userUuid });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        user.active = false;
        await user.save();
        return user;
    } catch (error) {
        throw new Error(`Error al desactivar el usuario: ${error.message}`);
    }
};
  

module.exports = {
    registerUser,
    loginUser,
    getClientIp,
    logoutUser,
    getUserService,
    getUserByEmailService,
    updateUser,
    deactivateUser
};

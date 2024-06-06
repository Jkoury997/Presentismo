// controllers/userController.js
const { registerUser,loginUser,getClientIp,logoutUser,getUserService,getUserByEmailService} = require('../services/userService');
const { generateAccessToken, generateRefreshToken,revokeTokens} = require('../services/tokenService');


const register = async (req, res) => {
    try {
        const { firstName, lastName, dni, email, password } = req.body;
        const role = 'employed'; // Rol por defecto
        const { user, deviceUUID } = await registerUser({ firstName, lastName, dni, email, password, role });
        res.status(201).json({ message: 'User registered successfully', user, deviceUUID });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password, deviceUUID } = req.body;
        const user = await loginUser(email, password, deviceUUID);
        console.log(user)
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const ip = getClientIp(req);
        const role = user.role; // Asumiendo que el rol está en el usuario
        console.log(role)
        const accessToken = await generateAccessToken(user._id, user.uuid, role);
        const refreshToken = await generateRefreshToken(user.uuid, role, ip);

        res.status(200).json({ user, accessToken, refreshToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        await logoutUser(refreshToken);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }
};

const revokeAllTokens = async (req, res) => {
    const { userUuid } = req.body;

    if (!userUuid) {
        return res.status(400).json({ message: 'User UUID is required' });
    }

    try {
        await revokeTokens(userUuid);
        res.status(200).json({ message: 'All tokens revoked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error revoking tokens', error });
    }
};

async function getUser(req, res) {
    try {
      const user = await getUserService(req.params.useruuid);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  
  async function getUserByEmail(req, res) {
    try {
      const user = await getUserByEmailService(req.params.email);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

module.exports = {
    register,
    login,
    logout,
    revokeAllTokens,
    getUser,
    getUserByEmail
};
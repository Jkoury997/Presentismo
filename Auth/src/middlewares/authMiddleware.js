const jwt = require('jsonwebtoken');
const UserRole = require('../database/models/UserRole');

// Middleware para proteger rutas y verificar roles
const protect = (roles = []) => {
  return async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Verificar roles si se especificaron
        if (roles.length > 0) {
          const userRoles = await UserRole.findOne({ userUUID: decoded.userUUID });
          if (!userRoles || !roles.some(role => userRoles.roles.includes(role))) {
            return res.status(403).json({ message: 'Access denied, insufficient role' });
          }
        }

        next();
      } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
      }
    } else {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  };
};

module.exports = { protect };

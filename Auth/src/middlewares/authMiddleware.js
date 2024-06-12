const jwt = require('jsonwebtoken');

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from "Bearer <token>"
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Token verification passed");
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.'});
  }
};

// Middleware para autorizar roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied, insufficient role' });
    }
    console.log("Role authorization passed");
    next();
  };
};

// Middleware para autorizar roles o el mismo uuid
const authorizeRolesOrSelf = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role) || req.user.uuid === req.params.uuid) {
      return next();
    }
    return res.status(403).json({ message: 'Access denied, insufficient role or not the same user' });
  };
};

module.exports = {
  verifyToken,
  authorizeRoles,
  authorizeRolesOrSelf
};

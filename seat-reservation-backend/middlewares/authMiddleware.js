const jwt = require('jsonwebtoken');

// Verify JWT token
exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(403).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.userId = decoded.userId;
    next();
  });
};

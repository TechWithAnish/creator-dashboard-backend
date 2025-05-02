const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Add this to fetch user details
require('dotenv').config();

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token received:', token);
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = decoded; // Attach decoded payload (id, role) to req.user
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(401).json({ msg: 'Unauthorized' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Admin auth - Token received:', token);
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Admin auth - Decoded token:', decoded);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    if (user.role !== 'Admin') return res.status(403).json({ msg: 'Access denied' });

    req.user = decoded; // Attach decoded payload to req.user
    next();
  } catch (err) {
    console.error('Admin auth - Token verification error:', err.message);
    res.status(401).json({ msg: 'Unauthorized' });
  }
};

module.exports = { auth, adminAuth };
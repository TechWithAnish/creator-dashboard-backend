const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth'); // Update to use middleware/auth.js
const User = require('../models/User');

// Get analytics
router.get('/analytics', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });
    const totalCreditsSpent = await User.aggregate([
      { $group: { _id: null, total: { $sum: '$credits' } } },
      { $project: { _id: 0, total: 1 } },
    ]);
    res.json({
      totalUsers,
      activeUsers: activeUsers || 0,
      totalCreditsSpent: totalCreditsSpent[0]?.total || 0,
    });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('Users error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete user
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    if (user.role === 'Admin') {
      return res.status(400).json({ msg: 'Cannot delete admin users' });
    }
    await User.deleteOne({ _id: req.params.id }); // Updated from user.remove()
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Adjust user credits
router.put('/users/:id/credits', adminAuth, async (req, res) => {
  const { credits } = req.body;
  if (typeof credits !== 'number' || credits < 0) {
    return res.status(400).json({ msg: 'Invalid credits value' });
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    user.credits = credits;
    await user.save();
    res.json({ msg: 'Credits updated', credits: user.credits });
  } catch (err) {
    console.error('Adjust credits error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
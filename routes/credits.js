const express = require('express');
     const router = express.Router();
     const jwt = require('jsonwebtoken');
     const User = require('../models/User');

     // Middleware to verify JWT
     const auth = (req, res, next) => {
       try {
         const token = req.header('Authorization').replace('Bearer ', '');
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.userId = decoded.user.id;
         next();
       } catch (err) {
         res.status(401).json({ msg: 'Unauthorized' });
       }
     };

     // Get user credits
     router.get('/credits', auth, async (req, res) => {
       try {
         const user = await User.findById(req.userId);
         if (!user) {
           return res.status(404).json({ msg: 'User not found' });
         }
         res.json({ credits: user.credits, plan: user.plan });
       } catch (err) {
         console.error('Credits error:', err);
         res.status(500).json({ msg: 'Server error' });
       }
     });

     // Purchase plan
     router.post('/purchase', auth, async (req, res) => {
       const { plan } = req.body;
       if (!['Basic', 'Premium'].includes(plan)) {
         return res.status(400).json({ msg: 'Invalid plan' });
       }
       try {
         const user = await User.findById(req.userId);
         if (!user) {
           return res.status(404).json({ msg: 'User not found' });
         }
         // Mock payment processing
         const creditsToAdd = plan === 'Basic' ? 100 : 500;
         user.plan = plan;
         user.credits += creditsToAdd;
         await user.save();
         res.json({ msg: `Purchased ${plan} plan`, credits: user.credits, plan: user.plan });
       } catch (err) {
         console.error('Purchase error:', err);
         res.status(500).json({ msg: 'Server error' });
       }
     });

     // Spend credits (e.g., for saving posts)
     router.post('/spend', auth, async (req, res) => {
       const { amount } = req.body;
       if (!amount || amount <= 0) {
         return res.status(400).json({ msg: 'Invalid amount' });
       }
       try {
         const user = await User.findById(req.userId);
         if (!user) {
           return res.status(404).json({ msg: 'User not found' });
         }
         if (user.credits < amount) {
           return res.status(400).json({ msg: 'Insufficient credits' });
         }
         user.credits -= amount;
         await user.save();
         res.json({ msg: `Spent ${amount} credits`, credits: user.credits });
       } catch (err) {
         console.error('Spend error:', err);
         res.status(500).json({ msg: 'Server error' });
       }
     });

     module.exports = router;
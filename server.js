const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/feed');
const creditsRoutes = require('./routes/credits');
const adminRoutes = require('./routes/admin');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/credits', creditsRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Creator Dashboard Backend API');
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected to:', mongoose.connection.name);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
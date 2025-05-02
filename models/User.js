const mongoose = require('mongoose');

     const userSchema = new mongoose.Schema({
       username: { type: String, required: true, unique: true },
       email: { type: String, required: true, unique: true },
       password: { type: String, required: true },
       role: { type: String, enum: ['User', 'Admin'], default: 'User' },
       credits: { type: Number, default: 0 },
       plan: { type: String, enum: ['Free', 'Basic', 'Premium'], default: 'Free' },
       lastLogin: { type: Date },
     });

     module.exports = mongoose.model('User', userSchema);
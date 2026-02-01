const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ['athlete', 'organizer', 'club_admin'], default: 'athlete' },

    // Athlete Profile Fields (optional, populated for athletes)
    nationalId: String,
    nationality: String,
    dateOfBirth: Date,
    gender: String,
    phone: String,

    // Organizer Fields
    organizationName: String,

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

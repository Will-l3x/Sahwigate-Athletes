const mongoose = require('mongoose');

/**
 * User Schema
 * 
 * Stores authentication details and profile information for all user types.
 * We keep it simple by combining Athlete and Organizer fields in one schema,
 * allowing for role-based access control later.
 */
const UserSchema = new mongoose.Schema({
    // Core Auth Fields
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }, // In a real app, ensure this is hashed!
    fullName: { type: String, required: true },
    role: { type: String, enum: ['athlete', 'organizer', 'club_admin'], default: 'athlete' },

    // Athlete Profile Fields 
    // These are only relevant if role is 'athlete'
    nationalId: String,
    nationality: String,
    dateOfBirth: Date,
    gender: String,
    phone: String,

    // Organizer Fields
    // Specific to event organizers
    organizationName: String,

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

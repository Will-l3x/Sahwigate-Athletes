const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    distance: { type: Number, required: true }, // in km
    entryFee: { type: Number, required: true },
    capacity: { type: Number, default: 1000 },
    registeredCount: { type: Number, default: 0 }
});

const RaceSchema = new mongoose.Schema({
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    startTime: { type: Date, required: true },
    location: { type: String, required: true },
    type: { type: String, default: 'Road' },
    isLiveTrackingEnabled: { type: Boolean, default: false },
    visibility: { type: String, enum: ['PUBLIC', 'PRIVATE'], default: 'PUBLIC' },

    categories: [CategorySchema],

    status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'COMPLETED', 'CANCELLED'], default: 'PUBLISHED' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Race', RaceSchema);

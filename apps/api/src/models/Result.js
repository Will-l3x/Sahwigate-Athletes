const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    raceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Race', required: true },
    raceName: { type: String, required: true }, // Cache name for easier display
    distance: { type: String, required: true },
    time: { type: String, required: true }, // e.g. "03:45:12"
    date: { type: Date, required: true },
    rank: { type: Number, required: true },

    // Optional details
    splits: [String],
    pace: String,

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);

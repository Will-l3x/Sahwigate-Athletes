const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    raceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Race', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Subdocument ID

    amountPaid: { type: Number, required: true },
    status: { type: String, enum: ['CONFIRMED', 'CANCELLED', 'REFUNDED'], default: 'CONFIRMED' },
    bibNumber: String,

    registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', RegistrationSchema);

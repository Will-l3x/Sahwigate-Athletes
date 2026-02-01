const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fullName: String, // Cache for easier display
    status: { type: String, enum: ['PENDING', 'ACTIVE', 'REJECTED'], default: 'PENDING' },
    duesStatus: { type: String, enum: ['PAID', 'UNPAID', 'OVERDUE'], default: 'UNPAID' },
    joinedAt: { type: Date, default: Date.now }
});

const ClubSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    annualFee: { type: Number, default: 0 },
    logoUrl: String,
    status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
    members: [MemberSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Club', ClubSchema);

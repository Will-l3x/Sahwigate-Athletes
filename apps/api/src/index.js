require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Models
const User = require('./models/User');
const Race = require('./models/Race');
const Club = require('./models/Club');
const Registration = require('./models/Registration');
const Result = require('./models/Result');

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sahwigate')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- AUTH & USERS ---

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.passwordHash !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.json({ token: 'mock-jwt-token', user: { id: user._id, name: user.fullName, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, fullName, role, nationalId, dateOfBirth, gender, nationality, phone } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: 'Email already exists' });

        const newUser = await User.create({
            email,
            passwordHash: password,
            fullName,
            role: role || 'athlete',
            nationalId,
            dateOfBirth,
            gender,
            nationality,
            phone
        });

        // Auto-login response
        res.status(201).json({
            message: 'User created',
            token: 'mock-jwt-token',
            user: {
                id: newUser._id,
                name: newUser.fullName,
                role: newUser.role,
                ...req.body // Return other details for immediate UI update if needed
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/auth/profile/:userId', async (req, res) => {
    try {
        let user;
        // Handle potential legacy IDs but assume standard ObjectID in prod
        if (req.params.userId === 'u1') {
            user = await User.findOne({ email: 'nyasha@example.com' });
        } else if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
            user = await User.findById(req.params.userId);
        }

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({
            user_id: user._id,
            fullName: user.fullName,
            email: user.email,
            national_id: user.nationalId,
            nationality: user.nationality,
            date_of_birth: user.dateOfBirth,
            gender: user.gender,
            phone: user.phone
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed' });
    }
});

// --- RACES ---

app.get('/api/races', async (req, res) => {
    try {
        const races = await Race.find();
        res.json(races);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/races', async (req, res) => {
    try {
        const { name, startTime, location, categories, visibility, organizerId } = req.body;
        const race = await Race.create({
            organizerId: mongoose.Types.ObjectId.isValid(organizerId) ? organizerId : undefined,
            name,
            startTime,
            location,
            categories,
            visibility
        });
        res.status(201).json(race);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// --- CLUBS ---

app.get('/api/clubs', async (req, res) => {
    try {
        const clubs = await Club.find();
        res.json(clubs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/clubs/:id', async (req, res) => {
    try {
        let club;
        if (req.params.id === 'c1') {
            club = await Club.findOne({ name: 'Harare Harriers' });
        } else if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            club = await Club.findById(req.params.id);
        }
        if (!club) return res.status(404).json({ error: 'Club not found' });
        res.json(club);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/clubs', async (req, res) => {
    try {
        const { name, city, annualFee, logoUrl } = req.body;
        const club = await Club.create({
            name,
            city,
            annualFee,
            logoUrl
        });
        res.status(201).json(club);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/clubs/:id/members', async (req, res) => {
    try {
        let club;
        if (req.params.id === 'c1') {
            club = await Club.findOne({ name: 'Harare Harriers' });
        } else if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            club = await Club.findById(req.params.id);
        }

        if (!club) return res.status(404).json({ error: 'Club not found' });

        const members = club.members.map(m => ({
            membership_id: m._id,
            full_name: m.fullName,
            status: m.status,
            dues_status: m.duesStatus,
            joined_at: m.joinedAt
        }));

        res.json(members);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- REGISTRATIONS & RESULTS ---

app.post('/api/registrations', async (req, res) => {
    try {
        const { raceId, categoryId, amount, userId } = req.body;

        const race = await Race.findById(raceId);
        if (!race) return res.status(404).json({ error: 'Race not found' });

        const category = race.categories.id(categoryId);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        if (category.registeredCount >= category.capacity) {
            return res.status(409).json({ error: 'Sold Out' });
        }

        if (Math.random() < 0.1) return res.status(402).json({ error: 'Payment declined' });

        // Resolve user
        let userObj;
        if (userId === 'u1') {
            userObj = await User.findOne({ email: 'nyasha@example.com' });
        } else if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            userObj = await User.findById(userId);
        }

        if (!userObj) return res.status(404).json({ error: 'User not found' });

        await Registration.create({
            userId: userObj._id,
            raceId: race._id,
            categoryId: category._id,
            amountPaid: amount
        });

        category.registeredCount++;
        await race.save();

        res.status(201).json({ message: 'Registered' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/results', async (req, res) => {
    try {
        const userId = req.query.userId;
        const query = userId ? { userId } : {};

        if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
            // Probably mock ID u1, map to seed user
            const user = await User.findOne({ email: 'nyasha@example.com' });
            if (user) query.userId = user._id;
        }

        const results = await Result.find(query).sort({ date: -1 });

        const formatted = results.map(r => ({
            result_id: r._id,
            race_name: r.raceName,
            distance: r.distance,
            time: r.time,
            date: r.date,
            rank: r.rank
        }));

        res.json(formatted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch results' });
    }
});

// Live Tracking MOCK (no DB yet)
app.get('/api/live-tracking/:raceId', (req, res) => {
    const runners = [
        { id: 101, name: "Isaac Mpofu", bib: "1", country: "ZIM", pace: "3:05/km", dist_km: 40.2 },
        { id: 102, name: "Stephen Mokoka", bib: "4", country: "RSA", pace: "3:06/km", dist_km: 39.8 },
        { id: 105, name: "Nyasha Ushe", bib: "SAH", country: "ZIM", pace: "5:30/km", dist_km: 21.1 }
    ];
    res.json(runners);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} with MongoDB`);
});

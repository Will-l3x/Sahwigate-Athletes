const express = require('express');
const cors = require('cors');
const { query } = require('./db');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Initialize DB Schema
const initDb = async () => {
    try {
        const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        await query(sql);
        console.log('Database schema initialized');
    } catch (err) {
        console.error('Failed to initialize database:', err);
    }
};

app.post('/api/auth/register', async (req, res) => {
    const {
        email, password, fullName, dob, gender,
        nationalId, nationality, phone,
        addressStreet, addressCity, addressCountry,
        height, weight, bloodType, allergies, medicalConditions, shirtSize,
        emergencyName, emergencyRelation, emergencyPhone,
        primarySport
    } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const userResult = await query(
            'INSERT INTO users (email, password_hash, full_name, role) VALUES ($1, $2, $3, $4) RETURNING user_id',
            [email, password, fullName, 'athlete']
        );
        const userId = userResult.rows[0].user_id;

        await query(
            `INSERT INTO athlete_profiles (
                athlete_id, national_id, nationality, phone, date_of_birth, gender,
                address_street, address_city, address_country,
                height_cm, weight_kg, blood_type, allergies, medical_conditions, shirt_size,
                emergency_contact_name, emergency_contact_relation, emergency_contact_phone,
                primary_sport
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
            [
                userId, nationalId, nationality, phone, dob, gender,
                addressStreet, addressCity, addressCountry,
                height, weight, bloodType, allergies, medicalConditions, shirtSize,
                emergencyName, emergencyRelation, emergencyPhone,
                primarySport
            ]
        );

        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (err) {
        console.error(err);
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/races', async (req, res) => {
    const { organizerId, name, startTime, location, categories } = req.body;

    if (!name || !organizerId) {
        return res.status(400).json({ error: 'Name and Organizer ID are required' });
    }

    try {
        const raceResult = await query(
            'INSERT INTO races (organizer_id, name, start_time, location_name) VALUES ($1, $2, $3, $4) RETURNING race_id',
            [organizerId, name, startTime, location]
        );
        const raceId = raceResult.rows[0].race_id;

        if (categories && categories.length > 0) {
            for (const cat of categories) {
                await query(
                    'INSERT INTO race_categories (race_id, name, distance_km, entry_fee) VALUES ($1, $2, $3, $4)',
                    [raceId, cat.name, cat.distance, cat.fee]
                );
            }
        }

        res.status(201).json({ message: 'Race created successfully', raceId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/races', async (req, res) => {
    try {
        const result = await query('SELECT * FROM races');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch races' });
    }
});

app.get('/api/results', async (req, res) => {
    try {
        const userId = req.query.userId;
        const result = await query(
            userId
                ? 'SELECT * FROM results WHERE user_id = $1'
                : 'SELECT * FROM results',
            userId ? [userId] : []
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch results' });
    }
});

app.post('/api/payments', async (req, res) => {
    const { userId, amount, currency } = req.body;

    try {
        const result = await query(
            'INSERT INTO payments (user_id, amount, currency, status) VALUES ($1, $2, $3, $4) RETURNING payment_id',
            [userId || 'mock-user-id', amount, currency || 'USD', 'COMPLETED']
        );

        res.status(201).json({
            message: 'Payment successful',
            paymentId: result.rows[0].payment_id,
            status: 'COMPLETED'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Payment processing failed' });
    }
});

app.post('/api/registrations', async (req, res) => {
    const { userId, raceId, categoryId, amount } = req.body;

    try {
        // 1. Check Capacity
        const catResult = await query('SELECT * FROM race_categories WHERE category_id = $1', [categoryId]);
        if (catResult.rows.length === 0) return res.status(404).json({ error: 'Category not found' });

        const category = catResult.rows[0];
        if (category.registered >= category.capacity) {
            return res.status(409).json({ error: 'Selected category is sold out.' });
        }

        // 2. Simulate Payment Risk (10% chance of failure)
        if (Math.random() < 0.1) {
            return res.status(402).json({ error: 'Payment method declined. Please try another card.' });
        }

        // 3. Process Registration (Mock Transaction)
        await query(
            'INSERT INTO registrations (user_id, race_id, category_id, status) VALUES ($1, $2, $3, $4)',
            [userId || 'u1', raceId, categoryId, 'CONFIRMED']
        );

        res.status(201).json({ message: 'Registration confirmed', status: 'CONFIRMED' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed during processing' });
    }
});

/* CLUB ROUTES */
app.post('/api/clubs', async (req, res) => {
    const { name, city, annualFee, logoUrl } = req.body;
    try {
        const result = await query(
            'INSERT INTO clubs (name, city, annual_fee, logo_url, status) VALUES ($1, $2, $3, $4, $5) RETURNING club_id',
            [name, city, annualFee, logoUrl, 'PENDING']
        );
        res.status(201).json({ message: 'Club created', clubId: result.rows[0].club_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create club' });
    }
});

app.get('/api/clubs', async (req, res) => {
    try {
        const result = await query('SELECT * FROM clubs');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch clubs' });
    }
});

app.get('/api/clubs/:id', async (req, res) => {
    try {
        const result = await query('SELECT * FROM clubs WHERE club_id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Club not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch club' });
    }
});

app.patch('/api/clubs/:id/status', async (req, res) => {
    const { status } = req.body; // APPROVED, REJECTED
    try {
        await query('UPDATE clubs SET status = $1 WHERE club_id = $2', [status, req.params.id]);
        res.status(200).json({ message: `Club status updated to ${status}` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update club status' });
    }
});

app.post('/api/clubs/:id/join', async (req, res) => {
    const { userId } = req.body;
    const clubId = req.params.id;
    try {
        await query(
            'INSERT INTO club_members (club_id, user_id) VALUES ($1, $2)',
            [clubId, userId]
        );
        res.status(200).json({ message: 'Joined club successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to join club' });
    }
});

app.get('/api/clubs/:id/members', async (req, res) => {
    try {
        const result = await query(
            `SELECT cm.*, u.full_name 
             FROM club_members cm 
             JOIN users u ON cm.user_id = u.user_id 
             WHERE cm.club_id = $1`,
            [req.params.id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch members' });
    }
});

app.post('/api/club-members/:id/dues', async (req, res) => {
    try {
        await query(
            'UPDATE club_members SET dues_status = $1 WHERE membership_id = $2',
            [req.body.status, req.params.id]
        );
        res.status(200).json({ message: 'Dues status updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update status' });
    }
});

app.get('/health', (req, res) => res.send('OK'));

app.get('/api/live-tracking/:raceId', async (req, res) => {
    try {
        const result = await query('SELECT * FROM live_tracking WHERE race_id = $1', [req.params.raceId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch live data' });
    }
});

app.listen(PORT, async () => {
    await initDb();
    console.log(`Server running on port ${PORT}`);
});

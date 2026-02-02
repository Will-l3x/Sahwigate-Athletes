require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Race = require('./src/models/Race');
const Club = require('./src/models/Club');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sahwigate');
        console.log(`🌱 Connected to DB: ${mongoose.connection.name}`);

        // Drop collections to remove old indexes (fixes E11000 username error)
        try {
            await mongoose.connection.collection('users').drop();
            console.log('Dropped users collection');
        } catch (e) { /* ignore if clean */ }

        try {
            await mongoose.connection.collection('races').drop();
            console.log('Dropped races collection');
        } catch (e) { /* ignore */ }

        try {
            await mongoose.connection.collection('clubs').drop();
            console.log('Dropped clubs collection');
        } catch (e) { /* ignore */ }

        // 1. Create Users
        const athlete = await User.create({
            email: 'nyasha@example.com',
            passwordHash: 'pass',
            fullName: 'Nyasha Ushe',
            role: 'athlete',
            nationalId: '63-1234567-T-12',
            dateOfBirth: new Date('1995-05-12'),
            nationality: 'Zimbabwean',
            gender: 'Male',
            phone: '+263 77 123 4567'
        });

        const coach = await User.create({
            email: 'coach@harriers.com',
            passwordHash: 'pass',
            fullName: 'Coach Simba',
            role: 'organizer'
        });

        const clubAdmin = await User.create({
            email: 'admin@harriers.com',
            passwordHash: 'pass',
            fullName: 'Admin Alice',
            role: 'club_admin'
        });

        console.log('✅ Users Seeded');

        // 2. Create Races
        await Race.create({
            organizerId: coach._id,
            name: 'Victoria Falls Marathon 2026',
            startTime: new Date('2026-07-05T06:00:00'),
            location: 'Victoria Falls',
            type: 'Marathon',
            isLiveTrackingEnabled: true,
            categories: [
                { name: '42.2km Full Marathon', distance: 42.2, entryFee: 30, capacity: 1000, registeredCount: 450 },
                { name: '21.1km Half Marathon', distance: 21.1, entryFee: 20, capacity: 500, registeredCount: 500 } // SOLD OUT
            ]
        });

        await Race.create({
            organizerId: coach._id,
            name: 'Tanganda Half Marathon',
            startTime: new Date('2026-06-15T06:30:00'),
            location: 'Mutare',
            categories: [
                { name: '21.1km Half', distance: 21.1, entryFee: 15 }
            ]
        });

        console.log('✅ Races Seeded');

        // 3. Create Clubs
        await Club.create({
            name: 'Harare Harriers',
            city: 'Harare',
            annualFee: 120,
            status: 'APPROVED',
            members: [
                { userId: athlete._id, fullName: athlete.fullName, status: 'ACTIVE', duesStatus: 'PAID' },
                { fullName: 'Tariro Moyo', status: 'ACTIVE', duesStatus: 'OVERDUE' },
                { fullName: 'Pending User', status: 'PENDING' }
            ]
        });

        console.log('✅ Clubs Seeded');

        // 4. Create Results (History)
        const Result = require('./src/models/Result');
        try {
            await mongoose.connection.collection('results').drop();
        } catch (e) { /* clean */ }

        await Result.create({
            userId: athlete._id, // Nyasha
            raceId: new mongoose.Types.ObjectId(), // Historical race, doesn't need to exist in Races table for this log
            raceName: 'Econet Vic Falls Marathon 2025',
            distance: '42.2km',
            time: '03:45:12',
            date: new Date('2025-07-07'),
            rank: 142
        });

        await Result.create({
            userId: athlete._id,
            raceId: new mongoose.Types.ObjectId(),
            raceName: 'CBZ Marathon',
            distance: '21.1km',
            time: '01:52:30',
            date: new Date('2025-03-12'),
            rank: 56
        });

        console.log('✅ Results Seeded');

        process.exit(0);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();

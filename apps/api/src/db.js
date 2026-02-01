/* MOCK DB ADAPTER - USE WHEN POSTGRES IS UNAVAILABLE */
console.warn("⚠️  USING IN-MEMORY MOCK DATABASE - SEEDED WITH DEMO DATA");

const users = [
    { user_id: 'u1', email: 'nyasha@example.com', password_hash: 'pass', full_name: 'Nyasha Ushe', role: 'athlete' },
    { user_id: 'u2', email: 'tariro@example.com', password_hash: 'pass', full_name: 'Tariro Moyo', role: 'athlete' },
    { user_id: 'u3', email: 'coach@harriers.com', password_hash: 'pass', full_name: 'Coach Simba', role: 'organizer' }
];

const clubs = [
    { club_id: 'c1', name: 'Harare Harriers', city: 'Harare', annual_fee: 120, logo_url: '', status: 'APPROVED' },
    { club_id: 'c2', name: 'Bulawayo Striders', city: 'Bulawayo', annual_fee: 100, logo_url: '', status: 'APPROVED' },
    { club_id: 'c3', name: 'Vic Falls Trailblazers', city: 'Victoria Falls', annual_fee: 0, logo_url: '', status: 'PENDING' }
];

const races = [
    { race_id: 'r1', organizer_id: 'u3', name: 'Victoria Falls Marathon 2026', start_time: '2026-07-05T06:00:00', location_name: 'Victoria Falls', is_live_tracking_enabled: true, type: 'Marathon' },
    { race_id: 'r2', organizer_id: 'u3', name: 'Tanganda Half Marathon', start_time: '2026-06-15T06:30:00', location_name: 'Mutare', is_live_tracking_enabled: false, type: 'Road' },
    { race_id: 'r3', organizer_id: 'u3', name: 'PPC Matopos 33-Miler', start_time: '2026-04-04T05:30:00', location_name: 'Bulawayo', is_live_tracking_enabled: false, type: 'Ultra' },
    { race_id: 'r4', organizer_id: 'u3', name: 'Vumba Mountain Trail', start_time: '2026-08-12T07:00:00', location_name: 'Vumba', is_live_tracking_enabled: false, type: 'Trail' },
    { race_id: 'r5', organizer_id: 'u3', name: 'Harare Track League', start_time: '2026-03-10T14:00:00', location_name: 'National Sports Stadium', is_live_tracking_enabled: false, type: 'Track' }
];

const raceCategories = [
    { category_id: 'cat1', race_id: 'r1', name: '42.2km Full Marathon', distance_km: 42.2, entry_fee: 30, capacity: 1000, registered: 450 },
    { category_id: 'cat2', race_id: 'r1', name: '21.1km Half Marathon', distance_km: 21.1, entry_fee: 20, capacity: 500, registered: 500 }, // Full
    { category_id: 'cat3', race_id: 'r2', name: '21.1km Half', distance_km: 21.1, entry_fee: 15, capacity: 300, registered: 50 },
    { category_id: 'cat4', race_id: 'r3', name: '33 Miler (53km)', distance_km: 53.0, entry_fee: 25, capacity: 100, registered: 80 }
];

const clubMembers = [
    { membership_id: 'm1', club_id: 'c1', user_id: 'u1', status: 'ACTIVE', dues_status: 'PAID', joined_at: '2025-01-10' },
    { membership_id: 'm2', club_id: 'c1', user_id: 'u2', status: 'ACTIVE', dues_status: 'OVERDUE', joined_at: '2025-02-15' }
];

// Mock Results for "My Times" / Leaderboards
const raceResults = [
    { result_id: 'res1', user_id: 'u1', race_name: 'Econet Vic Falls Marathon 2025', distance: '42.2km', time: '03:45:12', date: '2025-07-07', rank: 142 },
    { result_id: 'res2', user_id: 'u1', race_name: 'CBZ Marathon', distance: '21.1km', time: '01:52:30', date: '2025-03-12', rank: 56 },
    { result_id: 'res3', user_id: 'u2', race_name: 'Tanganda Half', distance: '21.1km', time: '02:10:45', date: '2025-06-20', rank: 89 }
];

const athleteProfiles = [
    {
        athlete_id: 'u1',
        national_id: '63-1234567-T-12',
        nationality: 'Zimbabwean',
        date_of_birth: '1995-05-12',
        gender: 'Male',
        phone: '+263 77 123 4567'
    }
];
const payments = [];

module.exports = {
    query: async (text, params = []) => {
        const command = text.trim().toUpperCase();

        // ... existing live tracking ...

        // --- ATHLETE PROFILES ---
        if (text.includes('SELECT * FROM athlete_profiles WHERE athlete_id')) {
            const profile = athleteProfiles.find(p => p.athlete_id === params[0]);
            return { rows: profile ? [profile] : [] };
        }

        if (text.includes('INSERT INTO athlete_profiles')) {
            // ... existing insert logic (can leave as is or match new structure)
            // For consistency with seed, let's just push a formatted object if possible, 
            // but strictly the previous insert mocked it loosely. 
            // Let's keep the previous INSERT generic for now to avoid breaking register flow 
            // unless we want to police it. 
            // Actually, let's support reading the specific fields we need for the modal.
            const profile = {
                athlete_id: params[0],
                national_id: params[1],
                nationality: params[2],
                phone: params[3],
                date_of_birth: params[4],
                // ... others
            };
            athleteProfiles.push(profile);
            return { rows: [] };
        }

        // ... rest of DB

        // --- LIVE TRACKING (New) ---
        if (text.includes('SELECT') && text.includes('live_tracking')) {
            // Simulate Race Progress: Race started 2 hours ago
            const elapsedHours = 2.5;
            const runners = [
                { id: 101, name: "Isaac Mpofu", bib: "1", country: "ZIM", pace: "3:05/km", dist_km: 40.2 },
                { id: 102, name: "Stephen Mokoka", bib: "4", country: "RSA", pace: "3:06/km", dist_km: 39.8 },
                { id: 103, name: "Blessing Wason", bib: "12", country: "ZIM", pace: "3:10/km", dist_km: 38.5 },
                { id: 104, name: "Fortunate Chidzivo", bib: "F1", country: "ZIM", pace: "3:25/km", dist_km: 36.2 },
                { id: 105, name: "Nyasha Ushe", bib: "SAH", country: "ZIM", pace: "5:30/km", dist_km: 21.1 }
            ];

            // Add some random jitter to simulate live movement
            const jittered = runners.map(r => ({
                ...r,
                dist_km: Math.min(42.2, r.dist_km + (Math.random() * 0.1))
            }));

            return { rows: jittered.sort((a, b) => b.dist_km - a.dist_km) };
        }

        if (command.startsWith('CREATE TABLE')) return { rows: [] };

        // --- AUTH & USERS ---
        if (text.includes('INSERT INTO users')) {
            if (users.find(u => u.email === params[0])) {
                const err = new Error('Duplicate key'); err.code = '23505'; throw err;
            }
            const userId = 'mock-user-' + Date.now();
            users.push({ user_id: userId, email: params[0], password_hash: params[1], full_name: params[2], role: 'athlete' });
            return { rows: [{ user_id: userId }] };
        }

        if (text.includes('SELECT * FROM users WHERE user_id')) {
            const user = users.find(u => u.user_id === params[0]);
            return { rows: user ? [user] : [] };
        }

        // --- ATHLETE PROFILES ---
        if (text.includes('INSERT INTO athlete_profiles')) {
            // Mock storing profile
            const profile = {
                athlete_id: params[0],
                // Simply storing all params in fuzzy way for mock
                params: params.slice(1)
            };
            athleteProfiles.push(profile);
            return { rows: [] };
        }

        // --- CLUBS ---
        if (text.includes('SELECT * FROM clubs WHERE club_id')) {
            const club = clubs.find(c => c.club_id === params[0]);
            return { rows: club ? [club] : [] };
        }
        if (text.includes('SELECT * FROM clubs')) return { rows: clubs };

        if (text.includes('INSERT INTO clubs')) {
            const clubId = 'mock-club-' + Date.now();
            clubs.push({ club_id: clubId, name: params[0], city: params[1], annual_fee: params[2], logo_url: params[3], status: 'PENDING' });
            return { rows: [{ club_id: clubId }] };
        }

        // --- UPDATE CLUB STATUS ---
        if (text.includes('UPDATE clubs SET status')) {
            const club = clubs.find(c => c.club_id === params[1]);
            if (club) club.status = params[0];
            return { rows: [] };
        }

        // --- MEMBERS ---
        if (text.includes('SELECT') && text.includes('club_members')) {
            const members = clubMembers
                .filter(m => m.club_id === params[0])
                .map(m => {
                    const user = users.find(u => u.user_id === m.user_id);
                    return { ...m, full_name: user ? user.full_name : 'Unknown Athlete' };
                });
            return { rows: members };
        }

        // --- RACES ---
        if (text.includes('INSERT INTO races')) {
            const raceId = 'mock-race-' + Date.now();
            races.push({ race_id: raceId, organizer_id: params[0], name: params[1], start_time: params[2], location_name: params[3] });
            return { rows: [{ race_id: raceId }] };
        }
        // New: Get All Races
        if (text.includes('SELECT * FROM races')) {
            const racesWithCategories = races.map(race => ({
                ...race,
                categories: raceCategories.filter(c => c.race_id === race.race_id)
            }));
            return { rows: racesWithCategories };
        }

        // Mock Update Dues
        if (text.includes('UPDATE club_members')) {
            // Handle both Status update and Dues update
            const memberId = params[1];
            const member = clubMembers.find(m => m.membership_id === memberId);

            if (member) {
                if (text.includes('dues_status')) {
                    member.dues_status = params[0];
                } else if (text.includes('status')) {
                    member.status = params[0];
                }
            }
            return { rows: [] };
        }

        // --- REGISTRATION (New) ---
        if (text.includes('SELECT * FROM race_categories WHERE category_id')) {
            const cat = raceCategories.find(c => c.category_id === params[0]);
            return { rows: cat ? [cat] : [] };
        }

        if (text.includes('INSERT INTO registrations')) {
            // Check capacity first
            const cat = raceCategories.find(c => c.category_id === params[1]);
            if (cat && cat.registered >= cat.capacity) {
                const err = new Error('Capacity reached'); err.code = 'CAPACITY_FULL'; throw err;
            }
            if (cat) cat.registered++; // Increment mock count

            return { rows: [{ registration_id: 'reg-' + Date.now() }] };
        }

        // --- RESULTS (New) ---
        if (text.includes('SELECT') && text.includes('results')) {
            // Very basic mock for "My Results"
            // Expecting query like "SELECT * FROM results WHERE user_id = $1"
            // For demo, we just return all results filtering by the user_id if present in params, or all if generic
            if (params.length > 0) {
                return { rows: raceResults.filter(r => r.user_id === params[0] || params[0] === 'u1') }; // Default to u1 for demo if ID doesn't match
            }
            return { rows: raceResults };
        }

        // Generic fallback
        return { rows: [] };
    },
    pool: { end: () => { } }
};

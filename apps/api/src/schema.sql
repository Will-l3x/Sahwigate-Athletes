CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'athlete',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS athlete_profiles (
    athlete_id UUID PRIMARY KEY REFERENCES users(user_id),
    -- Personal
    national_id VARCHAR(50),
    nationality VARCHAR(50),
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10),
    
    -- Address
    address_street VARCHAR(255),
    address_city VARCHAR(100),
    address_country VARCHAR(100),
    
    -- Physical & Medical
    height_cm DECIMAL(5,2),
    weight_kg DECIMAL(5,2),
    blood_type VARCHAR(5),
    allergies TEXT,
    medical_conditions TEXT,
    shirt_size VARCHAR(5),
    
    -- Emergency Contact
    emergency_contact_name VARCHAR(100),
    emergency_contact_relation VARCHAR(50),
    emergency_contact_phone VARCHAR(20),
    
    -- Athletic
    primary_sport VARCHAR(50),
    strava_token VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS races (
    race_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organizer_id UUID REFERENCES users(user_id),
    name VARCHAR(100) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    location_name VARCHAR(100),
    is_live_tracking_enabled BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS race_categories (
    category_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    race_id UUID REFERENCES races(race_id),
    name VARCHAR(50) NOT NULL,
    distance_km DECIMAL(5,2),
    entry_fee DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS payments (
    payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clubs (
    club_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    city VARCHAR(50),
    logo_url TEXT,
    annual_fee DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS club_members (
    membership_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    club_id UUID REFERENCES clubs(club_id),
    user_id UUID REFERENCES users(user_id),
    status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE
    dues_status VARCHAR(20) DEFAULT 'PAID', -- PAID, OVERDUE
    joined_at TIMESTAMP DEFAULT NOW()
);

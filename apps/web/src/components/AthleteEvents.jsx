import React, { useState, useEffect } from 'react';
import { PaymentModal } from './PaymentModal';
import { RegistrationModal } from './RegistrationModal';

export const AthleteEvents = () => {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [registrationOpen, setRegistrationOpen] = useState(false);
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [selectedRace, setSelectedRace] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:3000/api/races')
            .then(res => res.json())
            .then(data => {
                console.log('Fetched races:', data);
                setRaces(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching races:', err);
                setLoading(false);
            });
    }, []);

    // Filter Logic
    const filteredRaces = races.filter(race => {
        const matchesType = filter === 'All' || race.type === filter;
        const matchesSearch = race.name.toLowerCase().includes(search.toLowerCase()) ||
            race.location_name.toLowerCase().includes(search.toLowerCase());
        return matchesType && matchesSearch;
    });

    const handleRegisterClick = (race) => {
        setSelectedRace(race);
        setRegistrationOpen(true);
    };

    const handleProceedToPayment = (category) => {
        setSelectedCategory(category);
        setRegistrationOpen(false);
        setPaymentOpen(true);
    };

    const submitRegistration = async () => {
        const res = await fetch('http://localhost:3000/api/registrations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                raceId: selectedRace.race_id,
                categoryId: selectedCategory.category_id,
                amount: selectedCategory.entry_fee
            })
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || 'Registration failed');
        }
        return data;
    };

    const handlePaymentSuccess = () => {
        // Only called after successful API call
        setPaymentOpen(false);
        setSelectedRace(null);
        setSelectedCategory(null);
        alert(`Successfully registered! Check your email.`);
    };

    return (
        <div className="max-w-6xl mx-auto relative">
            {registrationOpen && selectedRace && (
                <RegistrationModal
                    race={selectedRace}
                    onClose={() => setRegistrationOpen(false)}
                    onProceedToPayment={handleProceedToPayment}
                />
            )}

            {paymentOpen && selectedRace && (
                <PaymentModal
                    amount={selectedCategory?.entry_fee || 20.00}
                    description={`Registration: ${selectedRace.name} - ${selectedCategory?.name}`}
                    onClose={() => setPaymentOpen(false)}
                    onSubmit={submitRegistration}
                    onSuccess={handlePaymentSuccess}
                />
            )}

            <header className="mb-8">
                <h1 className="text-3xl font-display font-bold text-secondary-900">Discover Events</h1>
                <p className="text-gray-500">Find your next challenge in the Sahwigate network.</p>
            </header>

            {/* Search & Filter Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search events or locations..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {['All', 'Marathon', 'Road', 'Trail', 'Track', 'Ultra'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === type
                                ? 'bg-secondary-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Event Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRaces.map(race => (
                    <div key={race.race_id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-40 bg-gray-200 relative">
                            <img
                                src={`https://source.unsplash.com/random/800x600/?running,${race.type || 'marathon'}`}
                                alt={race.name}
                                className="w-full h-full object-cover"
                                onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1533561098177-33633ab09a89?auto=format&fit=crop&q=80'}
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-secondary-900">
                                {race.type || 'Event'}
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-lg text-secondary-900 mb-1">{race.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{race.location_name} • {new Date(race.start_time).toLocaleDateString()}</p>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                <span className="text-secondary-900 font-bold">
                                    {race.categories && race.categories.length > 0
                                        ? `From $${Math.min(...race.categories.map(c => c.entry_fee))}`
                                        : '$20.00'}
                                </span>
                                <button
                                    onClick={() => handleRegisterClick(race)}
                                    className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-700 transition-colors"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <div className="inline-block w-8 h-8 border-4 border-secondary-200 border-t-secondary-900 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500">Loading upcoming events...</p>
                </div>
            ) : filteredRaces.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    No events found matching your criteria.
                </div>
            ) : null}
        </div>
    );
};

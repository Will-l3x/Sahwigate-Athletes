import React, { useEffect, useState } from 'react';
import { PaymentModal } from './PaymentModal';

export const AthleteClubDiscovery = () => {
    const [clubs, setClubs] = useState([]);
    const [filter, setFilter] = useState('All');
    const [joinedClubs, setJoinedClubs] = useState(['c1']); // Mock: User is already member of ID c1
    const [pendingClubs, setPendingClubs] = useState([]);
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [selectedClub, setSelectedClub] = useState(null);

    useEffect(() => {
        // Mock fetching all clubs
        fetch('http://localhost:3000/api/clubs')
            .then(res => res.json())
            .then(data => setClubs(data))
            .catch(err => console.error(err));
    }, []);

    const handleJoinClick = (club) => {
        setSelectedClub(club);
        if (club.annual_fee && club.annual_fee > 0) {
            setPaymentOpen(true);
        } else {
            // Free club, join directly
            sendJoinRequest(club.club_id);
        }
    };

    const sendJoinRequest = (clubId) => {
        setPendingClubs([...pendingClubs, clubId]);
        alert("Request sent! The Club Captain will review your application.");
    };

    const handlePaymentSuccess = () => {
        if (selectedClub) {
            sendJoinRequest(selectedClub.club_id);
        }
    };

    const filteredClubs = clubs.filter(club => filter === 'All' || club.type === filter);

    return (
        <div className="max-w-6xl mx-auto relative">
            {paymentOpen && <PaymentModal
                amount={selectedClub ? Number(selectedClub.annual_fee) : 0}
                description={`Annual Membership: ${selectedClub?.name}`}
                onClose={() => setPaymentOpen(false)}
                onSuccess={handlePaymentSuccess}
            />}

            <header className="mb-8">
                <h1 className="text-3xl font-display font-bold text-secondary-900">Find a Club</h1>
                <p className="text-gray-500">Connect with local training groups and competitive teams.</p>
            </header>

            {/* Filter Bar */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
                {['All', 'Road Running', 'Trail Running', 'Triathlon', 'Track & Field'].map(type => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === type
                            ? 'bg-secondary-900 text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Club Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClubs.map(club => {
                    const isMember = joinedClubs.includes(club.club_id);
                    const isPending = pendingClubs.includes(club.club_id);

                    return (
                        <div key={club.club_id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                            <div className="h-32 bg-gray-200 relative">
                                <img
                                    src={`https://images.unsplash.com/photo-1552674605-5d28c4e1906c?auto=format&fit=crop&q=80&w=800`}
                                    alt={club.name}
                                    className="w-full h-full object-cover opacity-90"
                                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1533561098177-33633ab09a89?auto=format&fit=crop&q=80'}
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-secondary-900">
                                    {club.type || 'Running Club'}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-secondary-900 mb-1">{club.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{club.city}</p>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="mr-2">📍</span> {club.base || 'Various Locations'}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="mr-2">💵</span> {club.annual_fee > 0 ? `$${club.annual_fee}/year` : 'Free Membership'}
                                    </div>
                                    {club.specialNeeds && (
                                        <div className="flex items-center text-xs text-primary-700 bg-primary-50 px-2 py-1 rounded w-fit">
                                            <span className="mr-1">♿</span> Para-Athlete Support
                                        </div>
                                    )}
                                </div>

                                {isMember ? (
                                    <button disabled className="w-full py-2 bg-green-100 text-green-800 rounded-lg font-bold text-sm">
                                        ✓ Member
                                    </button>
                                ) : isPending ? (
                                    <button disabled className="w-full py-2 bg-yellow-100 text-yellow-800 rounded-lg font-bold text-sm">
                                        ⏳ Request Pending
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleJoinClick(club)}
                                        className="w-full py-2 bg-secondary-900 text-white rounded-lg font-bold text-sm hover:bg-secondary-800 transition"
                                    >
                                        Request to Join
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

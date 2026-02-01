import React, { useState, useEffect } from 'react';

export const AthletePassport = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser && savedUser.id) {
            fetch(`http://localhost:3000/api/auth/profile/${savedUser.id}`)
                .then(res => res.json())
                .then(data => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to load passport", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Passport...</div>;
    if (!user) return <div className="p-8 text-center text-red-500">Please log in to view your passport.</div>;

    // Mock user data - now derived from fetched user
    const athlete = {
        name: user.name || 'N/A',
        id: user.id || 'N/A',
        dob: user.dob || 'N/A',
        club: user.club || 'N/A',
        emergency: user.emergency || user.emergency_contact_name || 'N/A',
        status: user.status || 'Active',
        bloodType: user.blood_type,
        allergies: user.allergies,
        medicalConditions: user.medical_conditions
    };

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-display font-bold text-secondary-900">My Athlete Passport</h1>
                <p className="text-gray-500">Your digital identity for race day check-in.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* ID Card / Digital Bib */}
                <div className="bg-gradient-to-br from-secondary-900 to-secondary-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                        <svg width="300" height="300" viewBox="0 0 200 200" fill="currentColor">
                            <path d="M45,-75C58.3,-69.3,69.6,-59.6,78.6,-48.1C87.6,-36.6,94.3,-23.3,92.8,-10.4C91.3,2.5,81.6,15.1,72.3,26.4C63,37.6,54.1,47.6,43.2,56.5C32.3,65.4,19.3,73.1,5.6,74.9C-8.1,76.7,-22.5,72.6,-35,65.4C-47.5,58.2,-58.1,47.9,-67.2,35.9C-76.3,23.8,-83.9,10,-83.7,-3.7C-83.6,-17.4,-75.7,-31,-65.4,-42.1C-55.1,-53.2,-42.4,-61.8,-29.4,-67.6C-16.4,-73.4,-3.1,-76.4,9.2,-79.4L21.5,-82.3" transform="translate(100 100)" />
                        </svg>
                    </div>

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold font-display uppercase tracking-wider">Sahwigate</h2>
                                <p className="text-xs text-primary-400 uppercase tracking-widest">Athletics Zimbabwe</p>
                            </div>
                            <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono border border-white/20">
                                {athlete.status}
                            </div>
                        </div>

                        <div className="my-8 flex justify-center">
                            <div className="bg-white p-4 rounded-xl shadow-lg">
                                {/* Placekitten or similar reliable placeholder for QR Code */}
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${athlete.id}`} alt="QR Code" className="w-32 h-32" />
                            </div>
                        </div>

                        <div>
                            <p className="text-secondary-300 text-xs uppercase">Athlete Name</p>
                            <p className="text-xl font-bold mb-2">{athlete.name}</p>

                            <div className="flex justify-between text-sm">
                                <div>
                                    <p className="text-secondary-300 text-xs uppercase">ID Number</p>
                                    <p className="font-mono">{athlete.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-secondary-300 text-xs uppercase">Club</p>
                                    <p>{athlete.club}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Medical & Bio Info */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800">Medical Identity</h3>
                        <button className="text-primary-600 text-sm font-medium hover:underline">Edit</button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center p-3 bg-red-50 rounded-lg text-red-800">
                            <span className="text-xl mr-3">🚑</span>
                            <div>
                                <p className="text-xs uppercase font-bold text-red-600">Emergency Contact</p>
                                <p className="font-medium">{athlete.emergency}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 border rounded-lg">
                                <p className="text-xs text-gray-500 uppercase">DoB</p>
                                <p className="font-medium text-gray-900">{athlete.dob}</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                                <p className="text-xs text-gray-500 uppercase">Blood Type</p>
                                <p className="font-medium text-gray-900">{athlete.bloodType || 'N/A'}</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                                <p className="text-xs text-gray-500 uppercase">Allergies</p>
                                <p className="font-medium text-gray-900">{athlete.allergies || 'None'}</p>
                            </div>
                            <div className="p-3 border rounded-lg">
                                <p className="text-xs text-gray-500 uppercase">Medical Conditions</p>
                                <p className="font-medium text-gray-900">{athlete.medicalConditions || 'None'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-2">Upcoming Race Bibs</h3>
                        <div className="flex items-center justify-between p-3 border border-secondary-100 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                            <div>
                                <p className="font-bold text-secondary-900">Vic Falls Marathon</p>
                                <p className="text-xs text-gray-500">21km • Race #402</p>
                            </div>
                            <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded">Assigned</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

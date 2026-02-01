import React, { useState, useEffect } from 'react';

export const RegistrationModal = ({ race, onClose, onProceedToPayment }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [athlete, setAthlete] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get logged in user ID
        const savedUser = JSON.parse(localStorage.getItem('user'));
        const userId = savedUser ? savedUser.id : null;

        if (!userId) {
            console.error("No user logged in");
            setLoading(false);
            return;
        }

        // Safety timeout in case fetch hangs
        const timer = setTimeout(() => {
            if (loading) {
                console.warn("Profile fetch timed out");
                setLoading(false);
            }
        }, 5000);

        fetch(`http://localhost:3000/api/auth/profile/${userId}`)
            .then(res => res.json())
            .then(data => {
                setAthlete(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load profile', err);
                setLoading(false);
            })
            .finally(() => clearTimeout(timer));

        return () => clearTimeout(timer);
    }, []);

    const handleProceed = () => {
        if (selectedCategory) {
            onProceedToPayment(selectedCategory);
        }
    };

    if (loading) return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl animate-pulse">Loading Profile...</div>
        </div>
    );


    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="bg-secondary-900 text-white p-6 shrink-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-secondary-300 text-xs font-bold tracking-wider uppercase mb-1">Event Registration</p>
                            <h2 className="text-2xl font-bold font-display">{race.name}</h2>
                            <p className="text-secondary-200 text-sm mt-1">📍 {race.location_name} • 📅 {new Date(race.start_time).toLocaleDateString()}</p>
                        </div>
                        <button onClick={onClose} className="text-white/60 hover:text-white p-1">
                            ✕
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto">
                    {/* Athlete Info */}
                    <section className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <span className="bg-primary-100 text-primary-700 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                            Confirm Athlete Details
                        </h3>
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Full Name</label>
                                <p className="font-medium text-gray-900">{athlete.fullName}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">National ID</label>
                                <p className="font-medium text-gray-900">{athlete?.national_id || athlete?.nationalId}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Date of Birth</label>
                                <p className="font-medium text-gray-900">{athlete?.date_of_birth || athlete?.dob}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Nationality</label>
                                <p className="font-medium text-gray-900">{athlete?.nationality}</p>
                            </div>
                            <div className="col-span-1 md:col-span-2 mt-2 pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-500 italic">
                                    * These details are pulled from your Athlete Passport. To update them, go to Profile Settings.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Category Selection */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <span className="bg-primary-100 text-primary-700 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                            Select Race Category
                        </h3>

                        {!race.categories || race.categories.length === 0 ? (
                            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm mb-4">
                                No specific categories defined for this race. Default entry applies.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {race.categories.map((cat) => (
                                    <label
                                        key={cat.category_id}
                                        className={`block relative border rounded-xl p-4 cursor-pointer transition-all ${selectedCategory?.category_id === cat.category_id
                                            ? 'border-secondary-900 ring-1 ring-secondary-900 bg-secondary-50'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    className="w-5 h-5 text-secondary-900 border-gray-300 focus:ring-secondary-900"
                                                    checked={selectedCategory?.category_id === cat.category_id}
                                                    onChange={() => setSelectedCategory(cat)}
                                                />
                                                <div className="ml-4">
                                                    <span className="block font-bold text-gray-900">{cat.name}</span>
                                                    <span className="block text-sm text-gray-500">{cat.distance_km} km</span>
                                                </div>
                                            </div>
                                            <div className="font-bold text-xl text-secondary-900">
                                                ${cat.entry_fee}
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleProceed}
                        disabled={!selectedCategory && (race.categories && race.categories.length > 0)}
                        className={`px-8 py-3 bg-secondary-900 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

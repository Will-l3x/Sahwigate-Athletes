import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
    const [races, setRaces] = useState([]);

    useEffect(() => {
        // In a real app we'd fetch this. For now using the mock API we (will) add
        fetch('http://localhost:3000/api/races')
            .then(res => res.json())
            .then(data => setRaces(data))
            .catch(() => {
                // Fallback if API endpoint isn't ready yet
                setRaces([
                    { race_id: 'r1', name: 'Victoria Falls Marathon 2026', start_time: '2026-07-05T06:00:00', location_name: 'Victoria Falls' },
                    { race_id: 'r2', name: 'Tanganda Half Marathon', start_time: '2026-06-15T06:30:00', location_name: 'Mutare' },
                ]);
            });
    }, []);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="bg-secondary-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                    Sahwi<span className="text-primary-500">Gate</span> Athletics
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                    The Operating System for Zimbabwean Sports. Register for races, manage your club, and track your legacy.
                </p>
                <div className="space-x-4">
                    <Link to="/register" className="bg-primary-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-primary-700 transition">
                        Athlete Passport
                    </Link>
                    <Link to="/login" className="bg-white text-secondary-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition">
                        Portal Login
                    </Link>
                </div>
            </div>

            {/* Featured Events */}
            <div className="max-w-7xl mx-auto py-12 px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-display font-bold text-secondary-900">Upcoming Events</h2>
                    <Link to="/events" className="text-primary-600 font-medium hover:underline">View All</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {races.map(race => (
                        <div key={race.race_id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group">
                            <div className="h-48 bg-gray-200 relative">
                                <img
                                    src={race.location_name.includes('Victoria') ? 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1552674605-5d28c4e1906c?q=80&w=800&auto=format&fit=crop'}
                                    alt={race.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => e.target.src = 'https://placehold.co/800x600?text=Race+Event'}
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-secondary-900">
                                    {new Date(race.start_time).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-secondary-900 mb-2">{race.name}</h3>
                                <p className="text-gray-500 text-sm mb-4 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    {race.location_name || 'Zimbabwe'}
                                </p>
                                <Link to="/live" className="block w-full text-center bg-secondary-900 text-white py-2 rounded-lg font-medium hover:bg-secondary-800">
                                    Watch Live
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Leaderboard Preview */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-display font-bold text-secondary-900 mb-8 text-center">National Leaderboard (2025)</h2>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-gray-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Rank</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Athlete</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Club</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Points</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-secondary-900 font-bold">1</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">Isaac Mpofu</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">ZRP</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-primary-600">1250</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-secondary-900 font-bold">2</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">Fortunate Chidzivo</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">Harare Harriers</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-primary-600">1180</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-secondary-900 font-bold">3</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">Blessing Wason</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">Black Rhinos</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-primary-600">950</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="bg-gray-50 px-6 py-3 text-center border-t border-gray-100">
                            <Link to="/leaderboard" className="text-sm text-primary-600 font-bold hover:underline">View Full Standings</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

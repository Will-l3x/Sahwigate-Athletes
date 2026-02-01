import React, { useEffect, useState } from 'react';

export const AthleteDashboard = () => {
    const [user, setUser] = useState({ name: 'Athlete', firstname: 'Athlete' });
    const [history, setHistory] = useState([]);
    const [recentResults, setRecentResults] = useState([]);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
            setUser({
                name: savedUser.name || savedUser.fullName || 'Athlete',
                firstname: (savedUser.name || savedUser.fullName || 'Athlete').split(' ')[0]
            });
            // Fetch Recent Results if ID exists
            if (savedUser.id) {
                fetch(`http://localhost:3000/api/results?userId=${savedUser.id}`)
                    .then(res => {
                        if (!res.ok) throw new Error('Failed to fetch results');
                        return res.json();
                    })
                    .then(data => {
                        if (Array.isArray(data)) {
                            setRecentResults(data.slice(0, 3));
                            setHistory(data);
                        } else {
                            console.error('API return invalid data:', data);
                            setHistory([]);
                            setRecentResults([]);
                        }
                    })
                    .catch(e => {
                        console.error(e);
                        // Ensure state is clean on error to prevent crash
                        setHistory([]);
                        setRecentResults([]);
                    });
            }
        }
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-8 p-6">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-secondary-900">Welcome back, {user.firstname}</h1>
                    <p className="text-gray-500">Member of <span className="font-semibold text-primary-600">Sahwigate Athletics</span></p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-uppercase text-gray-400 font-bold tracking-wider">Next Race</p>
                    <p className="text-xl font-bold text-secondary-900">Vic Falls Marathon</p>
                    <p className="text-sm text-primary-600">In 24 Days</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Stats & History */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                            <p className="text-xs text-gray-500 uppercase">Yearly Distance</p>
                            <p className="text-2xl font-bold text-secondary-900">452 <span className="text-sm font-medium text-gray-400">km</span></p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                            <p className="text-xs text-gray-500 uppercase">Races Run</p>
                            <p className="text-2xl font-bold text-secondary-900">5</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                            <p className="text-xs text-gray-500 uppercase">Nat. Rank</p>
                            <p className="text-2xl font-bold text-primary-600">#142</p>
                        </div>
                    </div>

                    {/* Historical Results */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-gray-700">Race History</h3>
                        </div>
                        <table className="min-w-full">
                            <tbody className="divide-y divide-gray-50">
                                {history.length > 0 ? history.map((res) => (
                                    <tr key={res.result_id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-secondary-900">{res.race_name}</p>
                                            <p className="text-xs text-gray-500">{new Date(res.date).toLocaleDateString()}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{res.distance}</td>
                                        <td className="px-6 py-4 font-mono font-medium text-secondary-900">{res.time}</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Rank {res.rank}</span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="p-6 text-center text-gray-500">No race history found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar: Upcoming & Club */}
                <div className="space-y-6">
                    <div className="bg-secondary-900 text-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold">Digital Passport</h3>
                            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="text-secondary-400 text-xs uppercase tracking-wider mb-1">Athlete ID</p>
                            <p className="font-mono text-xl tracking-widest">SAH-8291-002</p>
                        </div>
                        <div className="p-3 bg-white/10 rounded-lg text-sm mb-4">
                            <p className="text-gray-300 text-xs">Medical Info</p>
                            <p>Blood Group: O+ • Allergy: Penicillin</p>
                        </div>
                        <button className="w-full bg-white text-secondary-900 font-bold py-2 rounded">Show QR Code</button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-700 mb-4">Club Status</h3>
                        <div className="flex items-center justify-between p-3 bg-red-50 text-red-700 rounded-lg mb-4">
                            <span className="text-sm font-medium">2026 Dues Outstanding</span>
                            <span className="font-bold">Overdue</span>
                        </div>
                        <button className="w-full border border-secondary-200 text-secondary-900 font-medium py-2 rounded hover:bg-gray-50">Manage Membership</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

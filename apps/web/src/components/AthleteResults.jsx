import React, { useState, useEffect } from 'react';

export const AthleteResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get logged in user ID
        const savedUser = JSON.parse(localStorage.getItem('user'));
        const userId = savedUser ? savedUser.id : null; // Fallback handled by API returning empty or error

        if (!userId) {
            setLoading(false);
            return;
        }

        fetch(`http://localhost:3000/api/results?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                setResults(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Helper for PB badge
    const isPB = (rank) => rank <= 3; // Basic mock logic

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-display font-bold text-secondary-900">My Results</h1>
                <p className="text-gray-500">Track your performance history.</p>
            </header>

            {loading ? (
                <div className="text-center py-20">
                    <div className="inline-block w-8 h-8 border-4 border-secondary-200 border-t-secondary-900 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500">Loading history...</p>
                </div>
            ) : results.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl border border-gray-100 shadow-sm">
                    <span className="text-4xl block mb-4">🎽</span>
                    <h3 className="text-lg font-bold text-gray-900">No Results Yet</h3>
                    <p className="text-gray-500">Register for your first race to start building your profile!</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Race Name</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Distance</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Time</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Rank</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {results.map((res) => (
                                <tr key={res.result_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-secondary-900">{res.race_name}</td>
                                    <td className="p-4 text-gray-600">{new Date(res.date).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs font-bold">
                                            {res.distance}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right font-mono text-gray-700 font-bold">{res.time}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="text-gray-900 font-bold">#{res.rank}</span>
                                            {isPB(res.rank) && (
                                                <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded" title="Podium">🏆</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

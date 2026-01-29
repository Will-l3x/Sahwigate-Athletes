import React, { useEffect, useState } from 'react';

export const LiveTracker = () => {
    const [runners, setRunners] = useState([]);

    const fetchPositions = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/live-tracking/r1');
            const data = await res.json();
            setRunners(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPositions();
        const interval = setInterval(fetchPositions, 3000); // Poll every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const maxDist = 42.2;

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6">
            <div className="text-center mb-8">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">LIVE NOW</span>
                <h2 className="text-3xl font-display font-bold text-secondary-900 mt-4">Victoria Falls Marathon 2026</h2>
                <p className="text-gray-500">Live Coverage</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-6">
                {runners.map((runner, index) => {
                    const progress = (runner.dist_km / maxDist) * 100;
                    return (
                        <div key={runner.id} className="relative">
                            <div className="flex justify-between text-sm mb-1 font-bold text-gray-700">
                                <span>#{index + 1} {runner.name} <span className="text-xs font-normal text-gray-500">({runner.country})</span></span>
                                <span>{runner.dist_km.toFixed(1)} km</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ease-linear ${index === 0 ? 'bg-primary-600' : 'bg-secondary-400'}`}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>Pace: {runner.pace}</span>
                                <span>{Math.round((maxDist - runner.dist_km) * 3)} min ETA</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">Updates automatically every 3 seconds</p>
            </div>
        </div>
    );
};

import React from 'react';

export const AthleteResults = () => {
    // Mock Result Data
    const results = [
        { id: 1, race: 'Econet Victoria Falls Marathon', date: '2025-07-07', dist: '21.1 km', time: '01:59:00', pace: '05:39 /km', rank: '142 / 1200' },
        { id: 2, race: 'Tanganda Half Marathon', date: '2025-06-15', dist: '21.1 km', time: '02:05:12', pace: '05:56 /km', rank: '89 / 450' },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-display font-bold text-secondary-900">Race Results & Media</h1>
                <p className="text-gray-500">Your official times and digital finish line memories.</p>
            </header>

            <div className="space-y-8">
                {results.map((res, index) => (
                    <div key={res.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <h3 className="text-xl font-bold text-secondary-900">{res.race}</h3>
                                <p className="text-gray-500 text-sm">{new Date(res.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex gap-4">
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 uppercase">Official Time</p>
                                    <p className="text-2xl font-mono font-bold text-primary-600">{res.time}</p>
                                </div>
                                <div className="text-right pl-4 border-l border-gray-100">
                                    <p className="text-xs text-gray-400 uppercase">Rank</p>
                                    <p className="text-xl font-bold text-secondary-900">{res.rank}</p>
                                </div>
                            </div>
                        </div>

                        {/* Media Section */}
                        <div className="bg-gray-50 p-6">
                            <h4 className="font-bold text-gray-700 mb-4 text-sm uppercase tracking-wide">Sahwigate Media Package</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Video Highlight */}
                                <div className="col-span-2 bg-black rounded-lg overflow-hidden relative group cursor-pointer h-64 md:h-auto">
                                    <img
                                        src={`https://source.unsplash.com/random/800x400/?marathon,finish,${index}`}
                                        alt="Finish Line"
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <p className="text-white font-bold">Finish Line Cam</p>
                                        <p className="text-gray-300 text-xs">00:15</p>
                                    </div>
                                </div>

                                {/* Certificate */}
                                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-secondary-50 text-secondary-600 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 011.414.586l4 4a1 1 0 01.586 1.414V19a2 2 0 01-2 2z"></path></svg>
                                    </div>
                                    <h5 className="font-bold text-gray-900 mb-1">Official Certificate</h5>
                                    <p className="text-xs text-gray-500 mb-4">Verified by Athletics Zimbabwe</p>
                                    <button className="w-full border border-secondary-200 text-secondary-800 py-2 rounded font-medium hover:bg-gray-50 text-sm">
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

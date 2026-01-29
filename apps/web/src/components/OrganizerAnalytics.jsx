import React from 'react';

export const OrganizerAnalytics = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <header>
                <h1 className="text-3xl font-display font-bold text-secondary-900">Event Analytics</h1>
                <p className="text-gray-500">Real-time insights and post-event reporting.</p>
            </header>

            {/* Top Level Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs uppercase text-gray-500 font-bold mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">$24,900</p>
                    <p className="text-xs text-green-600">↑ 12% vs last year</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs uppercase text-gray-500 font-bold mb-1">Registrations</p>
                    <p className="text-3xl font-bold text-gray-900">1,245</p>
                    <p className="text-xs text-secondary-500">Target: 1,500</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs uppercase text-gray-500 font-bold mb-1">Avg. Pace</p>
                    <p className="text-3xl font-bold text-gray-900">5:42/km</p>
                    <p className="text-xs text-gray-400">Marathon Category</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-xs uppercase text-gray-500 font-bold mb-1">Finish Rate</p>
                    <p className="text-3xl font-bold text-green-600">98.2%</p>
                    <p className="text-xs text-gray-400">Predicted</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart Placeholder */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-80 flex flex-col">
                    <h3 className="font-bold text-gray-800 mb-4">Ticket Sales Velocity</h3>
                    <div className="flex-1 bg-gray-50 rounded-lg flex items-end justify-between px-4 pb-2">
                        {[40, 65, 45, 80, 55, 90, 120].map((h, i) => (
                            <div key={i} className="w-8 bg-primary-500 rounded-t" style={{ height: `${h}px` }}></div>
                        ))}
                    </div>
                </div>

                {/* Demographics Placeholder */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-80 flex flex-col">
                    <h3 className="font-bold text-gray-800 mb-4">Athlete Demographics</h3>
                    <div className="flex-1 flex items-center justify-center space-x-8">
                        <div className="w-32 h-32 rounded-full border-8 border-primary-500 flex items-center justify-center">
                            <span className="font-bold text-lg">65% M</span>
                        </div>
                        <div className="w-32 h-32 rounded-full border-8 border-secondary-400 flex items-center justify-center">
                            <span className="font-bold text-lg text-gray-500">35% F</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Heatmap Placeholder */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4">Regional Registration Heatmap</h3>
                <div className="bg-blue-50 h-64 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200">
                    <p className="text-blue-400 font-medium">Map Visualization goes here</p>
                </div>
            </div>
        </div>
    );
};

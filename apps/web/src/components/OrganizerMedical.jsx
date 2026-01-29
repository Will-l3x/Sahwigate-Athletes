import React, { useState } from 'react';

export const OrganizerMedical = () => {
    const [incidents, setIncidents] = useState([
        { id: 1, runner: '#402 - Sarah J.', location: 'Water Point 3 (21km)', type: 'Dehydration', time: '09:15 AM', status: 'Active', severity: 'Medium' },
        { id: 2, runner: '#115 - Mike T.', location: 'Finish Line', type: 'Cramps', time: '10:02 AM', status: 'Active', severity: 'Low' },
        { id: 3, runner: '#889 - Paul R.', location: 'Medical Tent A', type: 'Blisters', time: '08:45 AM', status: 'Resolved', severity: 'Low' },
    ]);

    const toggleStatus = (id) => {
        setIncidents(incidents.map(inc =>
            inc.id === id ? { ...inc, status: inc.status === 'Active' ? 'Resolved' : 'Active' } : inc
        ));
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-secondary-900">Medical Command Board</h1>
                    <p className="text-gray-500">Live incident tracking and medical resource dispatch.</p>
                </div>
                <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-red-700 animate-pulse">
                    + Report Incident
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Active Incidents List */}
                <div className="md:col-span-2 space-y-4">
                    <h2 className="font-bold text-lg text-gray-800">Recent Incidents</h2>
                    {incidents.map(inc => (
                        <div key={inc.id} className={`p-4 rounded-xl border-l-4 shadow-sm bg-white ${inc.status === 'Resolved' ? 'border-gray-300 opacity-75' : 'border-red-500'}`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${inc.severity === 'High' ? 'bg-red-100 text-red-700' :
                                                inc.severity === 'Medium' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            {inc.severity.toUpperCase()}
                                        </span>
                                        <span className="text-gray-400 text-xs font-mono">{inc.time}</span>
                                    </div>
                                    <h3 className="font-bold text-lg">{inc.runner}</h3>
                                    <p className="text-gray-600 text-sm">📍 {inc.location} • {inc.type}</p>
                                </div>
                                <button
                                    onClick={() => toggleStatus(inc.id)}
                                    className={`px-4 py-2 rounded text-sm font-bold ${inc.status === 'Resolved' ? 'bg-gray-100 text-gray-500' : 'bg-green-50 text-green-700 border border-green-200'}`}
                                >
                                    {inc.status === 'Resolved' ? 'Re-open' : 'Mark Resolved'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Status Overview */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4">Resource Status</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span>Ambulances</span>
                                <span className="font-bold text-green-600">4/4 Available</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span>Medics on Course</span>
                                <span className="font-bold text-green-600">12 Active</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span>Medical Tent A</span>
                                <span className="font-bold text-orange-500">Busy (80%)</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-secondary-900 text-white p-6 rounded-xl shadow-lg">
                        <h3 className="font-bold mb-2">Emergency Protocols</h3>
                        <ul className="text-sm space-y-2 text-secondary-300">
                            <li>1. Secure the scene</li>
                            <li>2. Assess severity (Triage)</li>
                            <li>3. Dispatch nearest medic</li>
                            <li>4. Log incident immediately</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const ClubEvents = () => {
    // In a real app, this would fetch events where organizer_id = currentClubId
    const [events, setEvents] = useState([]);

    // Simulating fetching local events
    useEffect(() => {
        // Mock data for demo
        setEvents([
            { id: 'e1', name: 'Weekly Time Trial', date: '2026-02-15T06:00', visibility: 'PRIVATE', registered: 45 },
            { id: 'e2', name: 'Harare Harriers Open 10k', date: '2026-03-01T06:30', visibility: 'PUBLIC', registered: 120 }
        ]);
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-secondary-900">Club Events</h1>
                    <p className="text-gray-500">Manage your training runs and public races.</p>
                </div>
                <Link to="/club/events/new" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 shadow-md flex items-center">
                    <span>+ Host New Event</span>
                </Link>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Event Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Visibility</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Registered</th>
                            <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {events.map((event) => (
                            <tr key={event.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-bold text-secondary-900">{event.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                    {new Date(event.date).toLocaleDateString()} <span className="text-xs text-gray-400">@ {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${event.visibility === 'PUBLIC' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {event.visibility}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                    {event.registered}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <button className="text-primary-600 hover:underline font-medium">Manage</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {events.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No events scheduled. Create one to get started!
                    </div>
                )}
            </div>
        </div>
    );
};

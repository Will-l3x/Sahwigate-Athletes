import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- Organizer Dashboard ---
// Main landing page for organizers. Shows status of events and tasks.
export const OrganizerDashboard = () => {
    const [pendingClubs, setPendingClubs] = useState([]);

    useEffect(() => {
        fetchClubs();
    }, []);

    // Fetch clubs that are waiting for approval
    const fetchClubs = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/clubs');
            const data = await res.json();
            setPendingClubs(data.filter(c => c.status === 'PENDING'));
        } catch (err) {
            console.error('Failed to fetch clubs');
        }
    };

    /**
     * Approves or Rejects a club application.
     * @param {string} clubId - The ID of the club
     * @param {string} status - New status (APPROVED/REJECTED)
     */
    const updateStatus = async (clubId, status) => {
        try {
            await fetch(`http://localhost:3000/api/clubs/${clubId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            fetchClubs(); // Refresh list to remove the processed club
        } catch (err) {
            console.error('Failed to update status');
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-secondary-900">Director Suite</h1>
                    <p className="text-gray-500">Overview of your active events and operations.</p>
                </div>
                <Link to="/organizer/events/new" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 shadow-md flex items-center">
                    <span>+ Create Event</span>
                </Link>
            </header>

            {pendingClubs.length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-orange-800 mb-4">🔔 Pending Club Approvals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pendingClubs.map(club => (
                            <div key={club.club_id} className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                                <h3 className="font-bold text-lg">{club.name}</h3>
                                <p className="text-sm text-gray-500 mb-1">{club.city}</p>
                                <p className="text-xs text-gray-400 mb-4">Annual Fee: ${club.annual_fee}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => updateStatus(club.club_id, 'APPROVED')}
                                        className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-bold hover:bg-green-700"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => updateStatus(club.club_id, 'REJECTED')}
                                        className="flex-1 bg-red-100 text-red-700 py-2 rounded text-sm font-bold hover:bg-red-200"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Active Event Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-8">
                <div className="bg-secondary-900 text-white p-6 flex justify-between items-start">
                    <div>
                        <div className="inline-block bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded mb-2">LIVE NOW</div>
                        <h2 className="text-2xl font-bold">Victoria Falls Marathon 2026</h2>
                        <p className="text-secondary-400">July 5, 2026 • Victoria Falls, Zimbabwe</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-mono font-bold">1,245</p>
                        <p className="text-xs text-secondary-400 uppercase">Registered Athletes</p>
                    </div>
                </div>

                {/* Operaional Metrics */}
                <div className="grid grid-cols-4 divide-x divide-gray-100">
                    <div className="p-6 text-center">
                        <p className="text-gray-500 text-xs uppercase mb-1">Ticket Revenue</p>
                        <p className="text-xl font-bold text-gray-900">$24,900</p>
                    </div>
                    <div className="p-6 text-center">
                        <p className="text-gray-500 text-xs uppercase mb-1">Check-in Status</p>
                        <p className="text-xl font-bold text-green-600">92%</p>
                    </div>
                    <div className="p-6 text-center">
                        <p className="text-gray-500 text-xs uppercase mb-1">Medical Incidents</p>
                        <p className="text-xl font-bold text-gray-900">0</p>
                    </div>
                    <div className="p-6 text-center bg-gray-50 flex items-center justify-center">
                        <Link to="/organizer/analytics" className="text-primary-600 font-medium hover:underline">View Full Analytics &rarr;</Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Alerts */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4">Operational Alerts</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded mr-3 mt-0.5">Logistics</span>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Water Truck 2 delayed</p>
                                <p className="text-xs text-gray-500">Driver reports traffic at border post. ETA +15mins.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mr-3 mt-0.5">System</span>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Live Timing Sync Active</p>
                                <p className="text-xs text-gray-500">Connected to Mats 1, 2, and Finish.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4">Tools</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 text-left">
                            <span className="block text-2xl mb-2">📢</span>
                            <span className="font-bold text-sm text-gray-700">Send Announcement</span>
                        </button>
                        <button className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 text-left">
                            <span className="block text-2xl mb-2">📦</span>
                            <span className="font-bold text-sm text-gray-700">Manage Inventory</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

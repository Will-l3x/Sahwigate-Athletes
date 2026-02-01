import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClubStatusPage } from './ClubStatusPage';

export const ClubDashboard = () => {
    const [club, setClub] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, we'd get the club ID associated with the logged-in user (admin)
        // For this demo, since we seeded 'Harare Harriers' as 'c1' and the logged in user might be 'u1' (member) or 'u3' (organizer)...
        // Let's assume the user is managing 'c1'.
        const clubId = 'c1'; // Default for demo

        fetch(`http://localhost:3000/api/clubs/${clubId}`)
            .then(res => res.json())
            .then(data => {
                setClub(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch club status', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Club Portal...</div>;

    // Block access if not approved
    if (club && (club.status === 'PENDING' || club.status === 'REJECTED')) {
        return <ClubStatusPage status={club.status} />;
    }

    const stats = {
        members: 142,
        pendingRequests: 3,
        upcomingEvents: 2,
        unpaidDues: 15,
        balance: 1250.00
    };

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-display font-bold text-secondary-900">{club ? club.name : 'Harare Harriers'} HQ</h1>
                <p className="text-gray-500">Manage your club operations and roster.</p>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs uppercase font-bold">Total Members</p>
                    <p className="text-3xl font-bold text-secondary-900">{stats.members}</p>
                    <p className="text-xs text-green-600 mt-1">↑ 4 this month</p>
                </div>
                <Link to="/club/roster" className="bg-white p-6 rounded-xl border border-primary-100 shadow-sm ring-2 ring-primary-50 cursor-pointer hover:bg-primary-50 transition group">
                    <p className="text-primary-600 text-xs uppercase font-bold">Pending Requests</p>
                    <p className="text-3xl font-bold text-primary-700">{stats.pendingRequests}</p>
                    <p className="text-xs text-primary-500 mt-1 font-medium group-hover:underline">Review Applications &rarr;</p>
                </Link>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs uppercase font-bold">Outstanding Dues</p>
                    <p className="text-3xl font-bold text-red-500">{stats.unpaidDues}</p>
                    <p className="text-xs text-gray-400 mt-1">Total: $450.00</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs uppercase font-bold">Club Balance</p>
                    <p className="text-3xl font-bold text-green-600">${stats.balance}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upcoming Club Activities */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800">Upcoming Activities</h3>
                        <Link to="/club/events" className="text-sm text-primary-600 font-bold hover:underline">Manage Events</Link>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="bg-white p-2 rounded border border-gray-200 text-center min-w-[50px] mr-4">
                                <span className="block text-xs text-gray-500 uppercase">Feb</span>
                                <span className="block text-lg font-bold text-secondary-900">15</span>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Weekly Time Trial</p>
                                <p className="text-xs text-gray-500">06:00 AM • Club House • Private</p>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="bg-white p-2 rounded border border-gray-200 text-center min-w-[50px] mr-4">
                                <span className="block text-xs text-gray-500 uppercase">Mar</span>
                                <span className="block text-lg font-bold text-secondary-900">01</span>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Harare Harriers Open 10k</p>
                                <p className="text-xs text-gray-500">06:30 AM • Showgrounds • Public</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Notifications */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-6">Team Alerts</h3>
                    <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm mb-4">
                        <strong>Kit Order Deadline:</strong> Reminder to submit bulk order for new vests by Friday.
                    </div>
                    <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                        <strong>Relay Team:</strong> Need 2 more runners for the PPC 33-Miler relay team.
                    </div>
                </div>
            </div>
        </div>
    );
};

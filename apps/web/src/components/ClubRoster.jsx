import React, { useEffect, useState } from 'react';

export const ClubRoster = () => {
    const clubId = 'c1';
    const [activeTab, setActiveTab] = useState('active'); // 'active' or 'pending'
    const [members, setMembers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock Fetching
    useEffect(() => {
        const fetchRoster = async () => {
            // Simulate fetching active members
            const activeData = [
                { membership_id: 'm1', user_id: 'u4', full_name: 'Nyasha Ushe', status: 'ACTIVE', dues_status: 'PAID', joined_at: '2024-01-15' },
                { membership_id: 'm2', user_id: 'u5', full_name: 'Tariro Moyo', status: 'ACTIVE', dues_status: 'UNPAID', joined_at: '2025-02-10' },
            ];
            // Simulate fetching pending requests
            const requestData = [
                { id: 'r1', name: 'Farai Gumbo', email: 'farai@example.com', date: '2026-06-28' },
                { id: 'r2', name: 'Sarah Smith', email: 'sarah@example.com', date: '2026-06-29' }
            ];

            setMembers(activeData);
            setRequests(requestData);
            setLoading(false);
        };
        fetchRoster();
    }, []);

    const handleApprove = (reqId) => {
        const req = requests.find(r => r.id === reqId);
        // Move to active
        setMembers([...members, {
            membership_id: `new-${Date.now()}`,
            user_id: `u-${Date.now()}`,
            full_name: req.name,
            status: 'ACTIVE',
            dues_status: 'UNPAID',
            joined_at: new Date().toISOString()
        }]);
        setRequests(requests.filter(r => r.id !== reqId));
    };

    const handleDecline = (reqId) => {
        setRequests(requests.filter(r => r.id !== reqId));
    };

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-display font-bold text-secondary-900">Membership Roster</h1>
                    <p className="text-gray-500">Manage your athletes and track subscription payments.</p>
                </div>
                <div className="flex gap-4">
                    {/* Tabs */}
                    <div className="bg-gray-100 p-1 rounded-lg flex">
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeTab === 'active' ? 'bg-white shadow text-secondary-900' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Active Members ({members.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition flex items-center ${activeTab === 'pending' ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <span className="mr-2">Pending Requests</span>
                            {requests.length > 0 && <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">{requests.length}</span>}
                        </button>
                    </div>
                </div>
            </header>

            {/* TAB CONTENT: ACTIVE */}
            {activeTab === 'active' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Athlete</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dues</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {members.map(mem => (
                                <tr key={mem.membership_id} className="hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center font-bold text-secondary-600">
                                                {mem.full_name ? mem.full_name.charAt(0) : '?'}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{mem.full_name}</div>
                                                <div className="text-sm text-gray-500">{mem.user_id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            ACTIVE
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${mem.dues_status === 'PAID' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                                            {mem.dues_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(mem.joined_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-gray-400 hover:text-gray-600">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* TAB CONTENT: PENDING */}
            {activeTab === 'pending' && (
                <div className="space-y-4">
                    {requests.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No pending join requests.</p>
                        </div>
                    ) : (
                        requests.map(req => (
                            <div key={req.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600 text-lg mr-4">
                                        {req.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{req.name}</h3>
                                        <p className="text-sm text-gray-500">Requested on {new Date(req.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleDecline(req.id)}
                                        className="px-4 py-2 border border-gray-300 text-gray-600 font-bold rounded-lg hover:bg-gray-50"
                                    >
                                        Decline
                                    </button>
                                    <button
                                        onClick={() => handleApprove(req.id)}
                                        className="px-4 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 shadow-sm"
                                    >
                                        Approve & Add to Roster
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

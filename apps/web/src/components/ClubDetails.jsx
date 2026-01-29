import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ClubDetails = () => {
    const { id } = useParams();
    const [club, setClub] = useState(null);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleMarkPaid = async (membershipId) => {
        try {
            await fetch(`http://localhost:3000/api/club-members/${membershipId}/dues`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'PAID' })
            });
            // Optimistic update
            setMembers(members.map(m =>
                m.membership_id === membershipId ? { ...m, dues_status: 'PAID' } : m
            ));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clubRes, membersRes] = await Promise.all([
                    fetch(`http://localhost:3000/api/clubs/${id}`),
                    fetch(`http://localhost:3000/api/clubs/${id}/members`)
                ]);

                if (clubRes.ok) setClub(await clubRes.json());
                const memData = await membersRes.json();
                setMembers(Array.isArray(memData) ? memData : []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading Club Data...</div>;
    if (!club) return <div className="p-8 text-center">Club not found.</div>;

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-secondary-900">{club.name}</h1>
                    <p className="text-gray-500 mt-1">{club.city} • {club.annual_fee > 0 ? `$${club.annual_fee}/year` : 'Free Membership'}</p>
                </div>
                <button className="bg-primary-600 text-white px-6 py-2 rounded-md font-bold hover:bg-primary-700">
                    Edit Club
                </button>
            </div>

            {/* Roster Table */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-700">Memebership Roster ({members.length})</h3>
                    <button className="text-sm text-primary-600 font-medium hover:underline">Download CSV</button>
                </div>

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
                        {members.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 text-sm">
                                    No members found. Invite athletes to join!
                                </td>
                            </tr>
                        ) : (
                            members.map(mem => (
                                <tr key={mem.membership_id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{mem.full_name}</div>
                                        <div className="text-sm text-gray-500">ID: {mem.user_id.substring(0, 8)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${mem.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {mem.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${mem.dues_status === 'PAID' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {mem.dues_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(mem.joined_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleMarkPaid(mem.membership_id)}
                                                className="text-primary-600 hover:text-primary-900 border border-primary-100 px-3 py-1 rounded hover:bg-primary-50 transition"
                                            >
                                                {mem.dues_status === 'PAID' ? 'Paid' : 'Mark Paid'}
                                            </button>
                                        </td>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

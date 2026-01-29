import React, { useState } from 'react';

export const ClubFinance = () => {
    // Mock Data
    const [transactions] = useState([
        { id: 1, member: 'John Doe', amount: 50, type: 'Annual Due', date: '2025-01-15', status: 'Paid' },
        { id: 2, member: 'Sarah Smith', amount: 35, type: 'Kit Purchase', date: '2025-01-18', status: 'Paid' },
        { id: 3, member: 'Mike Jones', amount: 50, type: 'Annual Due', date: '2025-01-20', status: 'Pending' },
        { id: 4, member: 'Emma Wilson', amount: 50, type: 'Annual Due', date: '2025-01-21', status: 'Overdue' },
    ]);

    const stats = {
        revenue: 12500,
        pending: 450,
        outstanding: 3,
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-secondary-900">Club Finances</h1>
                    <p className="text-gray-500">Track membership dues and expenses.</p>
                </div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-700">
                    + Record Expense
                </button>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 font-bold uppercase">Total Revenue (YTD)</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">${stats.revenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 font-bold uppercase">Pending Payments</p>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">${stats.pending}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 font-bold uppercase">Overdue Members</p>
                    <p className="text-3xl font-bold text-red-600 mt-2">{stats.outstanding}</p>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-bold text-lg text-secondary-900">Recent Transactions</h2>
                    <button className="text-sm text-primary-600 font-bold hover:underline">View All</button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                        <tr>
                            <th className="px-6 py-3">Member</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{tx.member}</td>
                                <td className="px-6 py-4 text-gray-500">{tx.type}</td>
                                <td className="px-6 py-4 text-gray-500">{new Date(tx.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 font-bold text-secondary-900">${tx.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${tx.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                            tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {tx.status !== 'Paid' && (
                                        <button className="text-xs font-bold text-primary-600 hover:text-primary-800 bg-primary-50 px-3 py-1 rounded-full transition-colors">
                                            Send Reminder
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

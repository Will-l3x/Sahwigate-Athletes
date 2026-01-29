import React, { useState } from 'react';

export const ClubMerch = () => {
    const [inventory] = useState([
        { id: 1, name: 'Official Club Vest', price: 35, stock: 12, category: 'Apparel', image: 'https://images.unsplash.com/photo-1577210926046-cf83a2143b8c?auto=format&fit=crop&q=80&w=200' },
        { id: 2, name: 'Training Shorts', price: 25, stock: 45, category: 'Apparel', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=200' },
        { id: 3, name: 'Club Cap', price: 15, stock: 8, category: 'Accessories', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=200' },
    ]);

    const [orders] = useState([
        { id: 101, member: 'John Doe', items: '1x Vest', total: 35, status: 'Fulfilled' },
        { id: 102, member: 'Jane Smith', items: '2x Cap', total: 30, status: 'Pending' },
    ]);

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-secondary-900">Club Kit & Merchandise</h1>
                    <p className="text-gray-500">Manage inventory and member orders.</p>
                </div>
                <button className="bg-secondary-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-black">
                    + Add New Item
                </button>
            </header>

            {/* Inventory Grid */}
            <section>
                <h2 className="text-xl font-bold text-secondary-900 mb-4">Current Inventory</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {inventory.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
                            <div className="h-40 bg-gray-100 relative">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                {item.stock < 10 && (
                                    <div className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">
                                        Low Stock
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-secondary-900">{item.name}</h3>
                                    <span className="text-sm font-bold text-primary-600">${item.price}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-4">{item.category}</p>
                                <div className="flex justify-between items-center text-sm">
                                    <span className={`font-medium ${item.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                                        {item.stock} in stock
                                    </span>
                                    <button className="text-gray-400 hover:text-gray-600">✏️ Edit</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Orders Table */}
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-lg text-secondary-900">Member Orders</h2>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">Member</th>
                            <th className="px-6 py-3">Items</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-mono text-sm text-gray-500">#{order.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{order.member}</td>
                                <td className="px-6 py-4 text-gray-600">{order.items}</td>
                                <td className="px-6 py-4 font-bold text-secondary-900">${order.total}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'Fulfilled' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {order.status === 'Pending' && (
                                        <button className="text-xs font-bold text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded transition-colors">
                                            Mark Fulfilled
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

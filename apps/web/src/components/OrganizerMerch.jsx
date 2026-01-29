import React, { useState } from 'react';

export const OrganizerMerch = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Official 2026 Marathon Vest', price: 25.00, stock: 150, sold: 45, category: 'Apparel' },
        { id: 2, name: 'Finisher Cap', price: 15.00, stock: 500, sold: 12, category: 'Accessories' },
        { id: 3, name: 'Running Belt', price: 30.00, stock: 50, sold: 8, category: 'Gear' },
    ]);

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-secondary-900">Merchandise Store</h1>
                    <p className="text-gray-500">Manage event inventory and track sales.</p>
                </div>
                <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-primary-700">
                    + Add New Product
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Product Inventory */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Product</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Price</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Stock</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Sales</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {products.map(p => (
                                    <tr key={p.id} className="hover:bg-gray-50">
                                        <td className="p-4 font-medium text-gray-900">{p.name}</td>
                                        <td className="p-4 text-sm text-gray-500">{p.category}</td>
                                        <td className="p-4 text-sm text-gray-900 text-right">${p.price.toFixed(2)}</td>
                                        <td className="p-4 text-center">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${p.stock < 50 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                {p.stock}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center text-sm font-bold text-secondary-900">{p.sold}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sales Summary */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4">Sales Overview</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">Total Revenue</span>
                                <span className="font-bold text-xl text-gray-900">$1,545.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">Items Sold</span>
                                <span className="font-bold text-xl text-gray-900">65</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">Best Seller</span>
                                <span className="font-medium text-sm text-primary-600">Official Vest</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary-50 p-6 rounded-xl border border-primary-100">
                        <h3 className="font-bold text-primary-800 mb-2">Quick Action</h3>
                        <p className="text-sm text-primary-600 mb-4">Low stock alert for XL sizes on Vests.</p>
                        <button className="w-full bg-white border border-primary-200 text-primary-700 py-2 rounded font-bold hover:bg-white/80">
                            Reorder Stock
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

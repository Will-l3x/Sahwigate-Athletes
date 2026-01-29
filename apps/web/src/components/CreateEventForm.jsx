import React, { useState } from 'react';
import { PaymentModal } from './PaymentModal';

export const CreateEventForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        startTime: '',
        location: '',
        organizerId: 'mock-organizer-id',
        organizerType: 'CLUB', // Default to CLUB for this demo
        visibility: 'PRIVATE', // Default to Private for clubs
        categories: [{ name: '5km Fun Run', distance: 5.0, fee: 5 }]
    });
    const [status, setStatus] = useState('idle');
    const [showPayment, setShowPayment] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (index, field, value) => {
        const newCategories = [...formData.categories];
        newCategories[index][field] = value;
        setFormData({ ...formData, categories: newCategories });
    };

    const addCategory = () => {
        setFormData({
            ...formData,
            categories: [...formData.categories, { name: '', distance: 0, fee: 0 }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowPayment(true);
    };

    const handlePaymentSuccess = async () => {
        setStatus('submitting');
        try {
            const res = await fetch('http://localhost:3000/api/races', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error('Failed to create event');
            setStatus('success');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">Event Created!</h2>
                <p className="text-gray-600">Your race is now live on Sahwigate Athletics.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 text-primary-600 underline">Create another</button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-display font-bold text-secondary-900 mb-6 text-center">
                Create New Event
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4 border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-medium text-gray-900">Event Details</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Race Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            placeholder="e.g. Vic Falls Marathon 2026"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Time</label>
                            <input
                                name="startTime"
                                type="datetime-local"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                name="location"
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-6">
                    <h3 className="col-span-2 text-lg font-medium text-gray-900">Visibility & Access</h3>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Who can see this event?</label>
                        <div className="flex gap-4">
                            <label className={`flex-1 border rounded-lg p-3 cursor-pointer transition ${formData.visibility === 'PUBLIC' ? 'bg-primary-50 border-primary-500 ring-1 ring-primary-500' : 'bg-white hover:bg-gray-50'}`}>
                                <div className="flex items-center">
                                    <input type="radio" name="visibility" value="PUBLIC" checked={formData.visibility === 'PUBLIC'} onChange={handleChange} className="h-4 w-4 text-primary-600 focus:ring-primary-500" />
                                    <div className="ml-3">
                                        <span className="block text-sm font-medium text-gray-900">Public</span>
                                        <span className="block text-xs text-gray-500">Visible to everyone on Sahwigate</span>
                                    </div>
                                </div>
                            </label>

                            <label className={`flex-1 border rounded-lg p-3 cursor-pointer transition ${formData.visibility === 'PRIVATE' ? 'bg-secondary-50 border-secondary-500 ring-1 ring-secondary-500' : 'bg-white hover:bg-gray-50'}`}>
                                <div className="flex items-center">
                                    <input type="radio" name="visibility" value="PRIVATE" checked={formData.visibility === 'PRIVATE'} onChange={handleChange} className="h-4 w-4 text-secondary-600 focus:ring-secondary-500" />
                                    <div className="ml-3">
                                        <span className="block text-sm font-medium text-gray-900">Club Only (Private)</span>
                                        <span className="block text-xs text-gray-500">Only visible to members & invitees</span>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">Race Categories</h3>
                        <button
                            type="button"
                            onClick={addCategory}
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                            + Add Category
                        </button>
                    </div>

                    {formData.categories.map((cat, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-2 items-end bg-gray-50 p-3 rounded-md">
                            <div className="col-span-6">
                                <label className="block text-xs font-medium text-gray-500">Name</label>
                                <input
                                    type="text"
                                    value={cat.name}
                                    onChange={(e) => handleCategoryChange(idx, 'name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-1 text-sm border"
                                />
                            </div>
                            <div className="col-span-3">
                                <label className="block text-xs font-medium text-gray-500">Dist (km)</label>
                                <input
                                    type="number"
                                    value={cat.distance}
                                    onChange={(e) => handleCategoryChange(idx, 'distance', parseFloat(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-1 text-sm border"
                                />
                            </div>
                            <div className="col-span-3">
                                <label className="block text-xs font-medium text-gray-500">Fee ($)</label>
                                <input
                                    type="number"
                                    value={cat.fee}
                                    onChange={(e) => handleCategoryChange(idx, 'fee', parseFloat(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-1 text-sm border"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary-900 hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-colors"
                >
                    {status === 'submitting' ? 'Creating...' : 'Launch Event'}
                </button>
            </form>

            <PaymentModal
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                amount={50.00}
                onSuccess={handlePaymentSuccess}
            />
        </div>
    );
};

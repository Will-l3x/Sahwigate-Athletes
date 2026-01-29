import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ClubCreateEventForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        startTime: '',
        location: '',
        organizerId: 'mock-club-id', // Represents the Club ID
        organizerType: 'CLUB',
        visibility: 'PRIVATE', // Default to Private
        categories: [{ name: 'Club Run', distance: 5.0, fee: 0 }]
    });
    const [status, setStatus] = useState('idle');

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
        setStatus('submitting');

        try {
            const res = await fetch('http://localhost:3000/api/races', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error('Failed to create event');
            setStatus('success');
            setTimeout(() => navigate('/club/events'), 2000); // Redirect to Club Event List
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-10">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Club Event Created!</h2>
                <p className="text-gray-500">Your event has been scheduled. Redirecting you to your event list...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-display font-bold text-secondary-900">Host a Club Event</h1>
                <p className="text-gray-500">Create a private time trial for your members or a public race for the community.</p>
            </header>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Basic Info */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Event Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                                <input name="name" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. Saturday Morning Time Trial" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                <input name="startTime" type="datetime-local" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location / Meeting Point</label>
                                <input name="location" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. Club House" />
                            </div>
                        </div>
                    </div>

                    {/* Visibility */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Visibility</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className={`flex border rounded-xl p-4 cursor-pointer transition ${formData.visibility === 'PRIVATE' ? 'bg-secondary-50 border-secondary-500 ring-1 ring-secondary-500' : 'bg-white hover:bg-gray-50'}`}>
                                <input type="radio" name="visibility" value="PRIVATE" checked={formData.visibility === 'PRIVATE'} onChange={handleChange} className="mt-1" />
                                <div className="ml-3">
                                    <span className="block font-bold text-gray-900">Members Only (Private)</span>
                                    <span className="block text-sm text-gray-500 mt-1">Visible only to active club members in the portal. Perfect for training runs.</span>
                                </div>
                            </label>

                            <label className={`flex border rounded-xl p-4 cursor-pointer transition ${formData.visibility === 'PUBLIC' ? 'bg-primary-50 border-primary-500 ring-1 ring-primary-500' : 'bg-white hover:bg-gray-50'}`}>
                                <input type="radio" name="visibility" value="PUBLIC" checked={formData.visibility === 'PUBLIC'} onChange={handleChange} className="mt-1" />
                                <div className="ml-3">
                                    <span className="block font-bold text-gray-900">Public Event</span>
                                    <span className="block text-sm text-gray-500 mt-1">Visible to ALL athletes on Sahwigate. Requires fee for external runners.</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="text-lg font-bold text-gray-900">Distances & Fees</h3>
                            <button type="button" onClick={addCategory} className="text-sm text-primary-600 font-bold hover:underline">+ Add Distance</button>
                        </div>

                        <div className="space-y-3">
                            {formData.categories.map((cat, idx) => (
                                <div key={idx} className="grid grid-cols-12 gap-4 items-end bg-gray-50 p-4 rounded-lg">
                                    <div className="col-span-6">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                                        <input
                                            value={cat.name}
                                            onChange={(e) => handleCategoryChange(idx, 'name', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md text-sm"
                                            placeholder="e.g. 5km Run"
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Dist (km)</label>
                                        <input
                                            type="number"
                                            value={cat.distance}
                                            onChange={(e) => handleCategoryChange(idx, 'distance', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md text-sm"
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Fee ($)</label>
                                        <input
                                            type="number"
                                            value={cat.fee}
                                            onChange={(e) => handleCategoryChange(idx, 'fee', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-md text-sm"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={status === 'submitting'} className="w-full bg-secondary-900 text-white font-bold py-3 rounded-xl hover:bg-secondary-800 transition shadow-lg">
                            {status === 'submitting' ? 'Scheduling...' : 'Create Club Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

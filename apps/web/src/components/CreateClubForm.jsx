import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateClubForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        province: 'Harare',
        city: '',
        base: '',
        type: 'Road Running',
        specialNeeds: false,
        specialNeedsDetails: '',
        email: '',
        phone: '',
        annualFee: '',
    });

    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        // Mock API call
        try {
            const res = await fetch('http://localhost:3000/api/clubs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setStatus('success');
                setTimeout(() => navigate('/club/dashboard'), 2000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Club Registered!</h2>
                    <p className="text-gray-500">Your application for <strong>{formData.name}</strong> has been submitted for approval. Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-secondary-900 py-8 px-8 text-white">
                    <h1 className="text-3xl font-display font-bold">Register a New Club</h1>
                    <p className="text-secondary-200 mt-2">Join the official Sahwigate Athletics network.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Basic Info */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Club Identity</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Official Club Name</label>
                                <input name="name" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. Westgate Run Club" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Club Type</label>
                                <select name="type" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none">
                                    <option>Road Running</option>
                                    <option>Trail Running</option>
                                    <option>Triathlon</option>
                                    <option>Track & Field</option>
                                    <option>School / University Team</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Membership Fee ($)</label>
                                <input name="annualFee" type="number" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="0.00" />
                            </div>
                        </div>
                    </div>

                    {/* Logistics */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Location & Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                                <select name="province" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none">
                                    <option>Harare</option>
                                    <option>Bulawayo</option>
                                    <option>Manicaland</option>
                                    <option>Mashonaland West</option>
                                    <option>Matabeleland North</option>
                                    <option>Midlands</option>
                                    {/* Add others as needed */}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City / Town</label>
                                <input name="city" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Physical Base / Meeting Point</label>
                                <input name="base" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. Old Georgians Sports Club, Groombridge" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Public Email</label>
                                <input name="email" type="email" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                                <input name="phone" onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="+263..." />
                            </div>
                        </div>
                    </div>

                    {/* Inclusivity */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Inclusivity & Special Needs</h3>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input type="checkbox" name="specialNeeds" onChange={handleChange} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                                <label className="ml-2 block text-sm text-gray-900">
                                    We offer specific support for Para-Athletes or Special Needs
                                </label>
                            </div>
                            {formData.specialNeeds && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Please describe your facilities/programs</label>
                                    <textarea name="specialNeedsDetails" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" rows="3" placeholder="e.g. Guide runners available, wheelchair accessible clubhouse..."></textarea>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={status === 'submitting'} className="w-full bg-primary-600 text-white font-bold py-3 rounded-xl hover:bg-primary-700 transition shadow-lg tracking-wide uppercase">
                            {status === 'submitting' ? 'Submitting Application...' : 'Submit Club Registration'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

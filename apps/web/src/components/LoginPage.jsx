import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = (role, path) => {
        // In a real app, this would perform authentication.
        // For the prototype, we simply redirect to the correct portal.
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-5xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-display font-bold text-secondary-900 mb-4">Welcome back to <span className="text-primary-600">Sahwigate</span></h1>
                    <p className="text-gray-500 text-lg">Select your portal to continue.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Athlete Card */}
                    <div
                        onClick={() => handleLogin('athlete', '/athlete/dashboard')}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl hover:border-primary-200 transition-all group"
                    >
                        <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                            🏃🏾‍♂️
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Athlete</h3>
                        <p className="text-gray-500 mb-6">Manage your passport, view results, and register for races.</p>
                        <span className="text-primary-600 font-bold group-hover:underline">Enter Portal &rarr;</span>
                    </div>

                    {/* Club Captain Card */}
                    <div
                        onClick={() => handleLogin('club', '/club/dashboard')}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl hover:border-secondary-200 transition-all group"
                    >
                        <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                            🛡️
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Club Captain</h3>
                        <p className="text-gray-500 mb-6">Manage your roster, track dues, and order kit for your team.</p>
                        <span className="text-secondary-600 font-bold group-hover:underline">Enter Portal &rarr;</span>
                    </div>

                    {/* Organizer Card */}
                    <div
                        onClick={() => handleLogin('organizer', '/organizer/dashboard')}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl hover:border-gray-300 transition-all group"
                    >
                        <div className="w-16 h-16 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                            🏁
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Race Director</h3>
                        <p className="text-gray-500 mb-6">Configure events, manage logistics, and view live analytics.</p>
                        <span className="text-gray-700 font-bold group-hover:underline">Enter Suite &rarr;</span>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-400 text-sm">Don't have an account? <Link to="/register" className="text-primary-600 hover:underline">Register as an Athlete</Link> or <Link to="/create-club" className="text-primary-600 hover:underline">Register a Club</Link></p>
                </div>
            </div>
        </div>
    );
};

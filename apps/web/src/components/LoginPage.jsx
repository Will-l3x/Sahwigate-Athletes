import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('idle'); // idle, loading, error
    const [errorMsg, setErrorMsg] = useState('');

    // In a real app these would be inputs, but for demo buttons we can hardcode credentials or mock input
    // To make this "Real", we should probably just have a simple quick login for the personas, 
    // OR actually add input fields. 
    // Given the user wants "new account" to work, I should assume they came from Register page which should auto-login or redirect here.
    // Let's add simple Email/Password inputs to make it functional for any account.

    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Login failed');

            // Store User
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);

            // Redirect based on role
            if (data.user.role === 'organizer') navigate('/organizer/dashboard');
            else if (data.user.role === 'club_admin') navigate('/club/dashboard');
            else navigate('/athlete/dashboard'); // Redirect to Dashboard not Events

        } catch (err) {
            console.error(err);
            setErrorMsg(err.message);
            setStatus('error');
        }
    };

    // Quick Login Helpers for Demo
    const quickLogin = (email, password) => {
        setFormData({ email, password });
        // Auto-submit in a useEffect or just let user click? Let's just fill it.
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display font-bold text-secondary-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-500">Sign in to Sahwigate Athletes</p>
                </div>

                {status === 'error' && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-secondary-900 text-white font-bold py-3 rounded-lg hover:bg-secondary-800 transition-colors disabled:opacity-50"
                    >
                        {status === 'loading' ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-xs text-center text-gray-400 uppercase tracking-widest font-bold mb-4">Demo Accounts</p>
                    <div className="flex gap-2 justify-center">
                        <button onClick={() => quickLogin('nyasha@example.com', 'pass')} className="bg-gray-100 hover:bg-gray-200 text-xs px-3 py-1 rounded">
                            Athlete (Nyasha)
                        </button>
                        <button onClick={() => quickLogin('coach@harriers.com', 'pass')} className="bg-gray-100 hover:bg-gray-200 text-xs px-3 py-1 rounded">
                            Director (Simba)
                        </button>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-gray-500 text-sm">
                        New here? <Link to="/register" className="text-primary-600 font-bold hover:underline">Create Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

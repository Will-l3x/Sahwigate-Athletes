import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const PortalSidebar = ({ title, links, user }) => {
    const location = useLocation();

    return (
        <div className="w-64 bg-secondary-900 min-h-screen text-white flex flex-col fixed left-0 top-0 bottom-0 z-50">
            {/* Brand Header */}
            <div className="p-6 border-b border-secondary-800">
                <Link to="/" className="block">
                    <h1 className="text-xl font-display font-extrabold tracking-tight">
                        Sahwi<span className="text-primary-500">Gate</span>
                    </h1>
                    <p className="text-xs text-secondary-400 uppercase tracking-widest mt-1">{title}</p>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {links.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? 'bg-primary-600 text-white'
                                : 'text-gray-300 hover:bg-secondary-800 hover:text-white'
                                }`}
                        >
                            <span className="mr-3 text-lg">{link.icon}</span>
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Footer */}
            <div className="p-4 border-t border-secondary-800 bg-secondary-950">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-xs font-bold font-mono">
                            {user.initials}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-secondary-400">{user.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem('user');
                            localStorage.removeItem('token');
                            window.location.href = '/login'; // Force full reload to clear any in-memory state
                        }}
                        className="p-2 text-gray-400 hover:text-white hover:bg-secondary-800 rounded-lg transition-colors"
                        title="Log Out"
                    >
                        <span className="text-xl">🚪</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

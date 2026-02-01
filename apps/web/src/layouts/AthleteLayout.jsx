import React from 'react';
import { Outlet } from 'react-router-dom';
import { PortalSidebar } from './PortalSidebar';

export const AthleteLayout = () => {
    // Get User from LocalStorage - Fallback to Guest if missing (or redirect in real app)
    const savedUser = JSON.parse(localStorage.getItem('user')) || { name: 'Guest User', initials: 'GU', role: 'Guest' };

    // Format for Sidebar (assuming savedUser has .name or .fullName from backend)
    const userForSidebar = {
        name: savedUser.name || savedUser.fullName || 'Athlete',
        initials: (savedUser.name || savedUser.fullName || 'A').charAt(0).toUpperCase(),
        role: savedUser.role || 'Athlete'
    };

    const links = [
        { label: 'Events', path: '/athlete/events', icon: '🏃' },
        { label: 'My Results', path: '/athlete/results', icon: '🏅' },
        { label: 'Clubs', path: '/athlete/clubs', icon: '🛡️' },
        { label: 'Training', path: '/athlete/training', icon: '⌚' },
        { label: 'Passport', path: '/athlete/passport', icon: '🆔' },
    ];

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <PortalSidebar title="Athlete Portal" links={links} user={userForSidebar} />
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
};

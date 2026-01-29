import React from 'react';
import { Outlet } from 'react-router-dom';
import { PortalSidebar } from './PortalSidebar';

export const AthleteLayout = () => {
    // Mock User Context
    const user = { name: 'Nyasha Ushe', initials: 'NU', role: 'Athlete' };

    const links = [
        { label: 'Dashboard', path: '/athlete/dashboard', icon: '📊' },
        { label: 'Events Discovery', path: '/athlete/events', icon: '🌍' },
        { label: 'My Passport', path: '/athlete/passport', icon: '🆔' },
        { label: 'Race Results', path: '/athlete/results', icon: '⏱️' },
        { label: 'My Club & Discovery', path: '/athlete/clubs', icon: '🛡️' },
    ];

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <PortalSidebar title="Athlete Portal" links={links} user={user} />
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
};

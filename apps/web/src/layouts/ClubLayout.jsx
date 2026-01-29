import React from 'react';
import { Outlet } from 'react-router-dom';
import { PortalSidebar } from './PortalSidebar';

export const ClubLayout = () => {
    // Mock User Context
    const user = { name: 'Captain Simba', initials: 'CS', role: 'Club Admin' };

    const links = [
        { label: 'Command Center', path: '/club/dashboard', icon: '⚡' },
        { label: 'My Events', path: '/club/events', icon: '📅' },
        { label: 'Membership Roster', path: '/club/roster', icon: '👥' },
        { label: 'Finances & Dues', path: '/club/finance', icon: '💰' },
        { label: 'Kit Orders', path: '/club/kit', icon: '👕' },
        { label: 'Club Settings', path: '/club/settings', icon: '⚙️' },
    ];

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <PortalSidebar title="Club Command" links={links} user={user} />
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
};

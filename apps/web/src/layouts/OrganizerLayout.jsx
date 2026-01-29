import React from 'react';
import { Outlet } from 'react-router-dom';
import { PortalSidebar } from './PortalSidebar';

export const OrganizerLayout = () => {
    // Mock User Context
    const user = { name: 'Race Director', initials: 'RD', role: 'Organizer' };

    const links = [
        { label: 'Event Suite', path: '/organizer/dashboard', icon: '🏢' },
        { label: 'Create Event', path: '/organizer/events/new', icon: '➕' },
        { label: 'Logistics Map', path: '/organizer/logistics', icon: '🚚' },
        { label: 'Medical Board', path: '/organizer/medical', icon: '🏥' },
        { label: 'Analytics', path: '/organizer/analytics', icon: '📈' },
        { label: 'Merchandise', path: '/organizer/merch', icon: '🛍️' },
    ];

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <PortalSidebar title="Director Suite" links={links} user={user} />
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
};

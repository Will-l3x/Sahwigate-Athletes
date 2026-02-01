import React from 'react';
import { Outlet } from 'react-router-dom';
import { PortalSidebar } from './PortalSidebar';

// --- Organizer Portal Layout ---
// Wraps all organizer-facing pages with a common sidebar navigation.

export const OrganizerLayout = () => {
    // Mock user context - in a real app this would come from an AuthProvider
    const user = { name: 'Race Director', initials: 'RD', role: 'Organizer' };

    // Navigation configuration
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
            {/* Sidebar navigation */}
            <PortalSidebar title="Director Suite" links={links} user={user} />

            {/* Main content area where child routes render */}
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
};

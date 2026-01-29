import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';

// Harare Center
const CENTER = [-17.824858, 31.053028];

// Map Event Handler to add points
function ClickToMap({ onMapClick }) {
    useMapEvents({
        click: (e) => {
            onMapClick(e.latlng);
        },
    });
    return null;
}

export const OrganizerLogistics = () => {
    const [activeMap, setActiveMap] = useState('42km');
    const [waypoints, setWaypoints] = useState([]);

    // Clear waypoints when switching maps (simulating loading different track data)
    useEffect(() => {
        setWaypoints([]);
    }, [activeMap]);

    const handleMapClick = (latlng) => {
        setWaypoints((prev) => [...prev, latlng]);
    };

    return (
        <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col">
            <header className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-secondary-900">Logistics & Route Maps</h1>
                    <p className="text-gray-500">Manage course resources and track fleet.</p>
                </div>
                <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                    {['42km', '21km', '5km'].map(map => (
                        <button
                            key={map}
                            onClick={() => setActiveMap(map)}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeMap === map ? 'bg-white shadow text-primary-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {map.toUpperCase()} Map
                        </button>
                    ))}
                </div>
            </header>

            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm relative overflow-hidden flex">
                {/* Sidebar Resources */}
                <div className="w-80 border-r border-gray-200 bg-gray-50 p-4 overflow-y-auto">
                    <h3 className="font-bold text-gray-800 mb-4">Route Resources ({activeMap})</h3>

                    <div className="space-y-4">
                        <div className="bg-white p-3 rounded border border-gray-200 shadow-sm mb-4">
                            <h4 className="font-bold text-sm text-gray-800 mb-1">🗺️ Route Planner</h4>
                            <p className="text-xs text-gray-500 mb-2">Click on the map to plot the course route.</p>
                            <div className="flex justify-between text-xs font-bold">
                                <span>Points: {waypoints.length}</span>
                                <button onClick={() => setWaypoints([])} className="text-red-500 hover:underline">Clear</button>
                            </div>
                        </div>

                        <div className="bg-white p-3 rounded border border-gray-200 shadow-sm">
                            <h4 className="font-bold text-sm text-blue-600">💧 Water Points</h4>
                            <p className="text-xs text-gray-500">8 Points deployed</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200 shadow-sm">
                            <h4 className="font-bold text-sm text-green-600">🚻 Toilets</h4>
                            <p className="text-xs text-gray-500">12 Units total</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-200 shadow-sm">
                            <h4 className="font-bold text-sm text-yellow-600">🚧 Road Blocks</h4>
                            <p className="text-xs text-gray-500">Police active at Main St.</p>
                        </div>
                    </div>
                </div>

                {/* Interactive Map */}
                <div className="flex-1 relative z-0">
                    <MapContainer center={CENTER} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <ClickToMap onMapClick={handleMapClick} />

                        {/* Render Route Polyline */}
                        {waypoints.length > 1 && (
                            <Polyline positions={waypoints} color="blue" weight={5} opacity={0.7} />
                        )}

                        {/* Render Waypoints */}
                        {waypoints.map((pos, idx) => (
                            <Marker key={idx} position={pos}>
                                <Popup>Waypoint {idx + 1}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

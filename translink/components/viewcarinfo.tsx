import React, { useEffect, useState } from 'react';

import { SpeedAndDistance } from '@/services/report';

interface VehicleData {
    id: string;
    speed: any;
    distance: any;
}

const VehicleDashboard: React.FC = () => {
    const [vehicleId, setVehicleId] = useState<string>('');
    const [vehicles, setVehicles] = useState<VehicleData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { fetchSpeedAndDistance, distance, speed } = SpeedAndDistance();
    const handleFetchVehicleData = () => {
        try {
            if (!vehicleId) {
                alert('Please enter a Vehicle ID.');
                return;
            }
            setLoading(true); // Set loading state to true
            setError(null); // Reset any previous errors
            if (vehicleId) {
                fetchSpeedAndDistance(vehicleId);
                console.log("speed:" , speed)
            const newVehicle: VehicleData = {
                id: vehicleId,
                speed:speed,
                distance:distance
            };

            setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
            setVehicleId(''); // Clear input field
        }}

         catch (err) {
            setError((err as Error)?.message || 'Error fetching vehicle data');
        } finally {
            setLoading(false); // Reset loading state
        }
    
    }
    const handleClearResults = () => {
        setVehicles([]);
        setError(null);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Vehicle Dashboard</h2>
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Vehicle ID"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                />
                <button
                    onClick={handleFetchVehicleData}
                    className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Loading...' : 'View'}
                </button>
                <button
                    onClick={handleClearResults}
                    className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
                >
                    Clear All
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">Vehicle ID</th>
                        <th className="py-2 px-4 border-b">Speed (km/h)</th>
                        <th className="py-2 px-4 border-b">Distance (km)</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="text-center py-4">No results found.</td>
                        </tr>
                    ) : (
                        vehicles.map((vehicle, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{vehicle.id}</td>
                                <td className="py-2 px-4 border-b">{vehicle.speed}</td>
                                <td className="py-2 px-4 border-b">{vehicle.distance}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleDashboard;
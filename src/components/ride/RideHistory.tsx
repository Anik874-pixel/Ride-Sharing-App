'use client'

import { useState } from 'react';
import { mockRideHistory } from '@/data/mockRides';
import RideHistoryCard from './RideHistoryCard';
import { RideHistory as RideHistoryType } from '@/types/ride';

export default function RideHistory() {
  const [rides] = useState<RideHistoryType[]>(mockRideHistory);
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'cancelled'>('all');

  // Filter rides based on status
  const filteredRides = rides.filter(ride => {
    if (filterStatus === 'all') return true;
    return ride.status === filterStatus;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Ride History</h2>
        <div className="flex gap-2">
          <select 
            className="border rounded-lg px-3 py-2 text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'completed' | 'cancelled')}
          >
            <option value="all">All Rides</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRides.length > 0 ? (
          filteredRides.map((ride) => (
            <RideHistoryCard key={ride.id} ride={ride} />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 ">
              {filterStatus === 'all' 
                ? 'No ride history found'
                : `No ${filterStatus} rides found`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
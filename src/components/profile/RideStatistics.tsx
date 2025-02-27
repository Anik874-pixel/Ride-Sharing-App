'use client'

import { RideStats } from '@/types/profile'

const mockStats: RideStats = {
  totalRides: 25,
  completedRides: 23,
  cancelledRides: 2,
  totalSpent: 4500,
  averageRating: 4.5,
  frequentDestinations: ['Mumbai Airport', 'Andheri Station', 'BKC']
}

export default function RideStatistics() {
  return (
    <div className="bg-white rounded-lg shadow p-6 dark:bg-black dark:text-gray-50">
      <h2 className="text-xl font-semibold mb-6">Ride Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4  ">
        <div className="bg-gray-50 p-4 rounded dark:bg-gray-900 dark:text-gray-50 ">
          <p className="text-gray-500">Total Rides</p>
          <p className="text-2xl font-semibold">{mockStats.totalRides}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded dark:bg-gray-900 dark:text-gray-50">
          <p className="text-gray-500">Completed</p>
          <p className="text-2xl font-semibold">{mockStats.completedRides}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded dark:bg-gray-900 dark:text-gray-50">
          <p className="text-gray-500">Cancelled</p>
          <p className="text-2xl font-semibold">{mockStats.cancelledRides}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Total Spent</h3>
        <p className="text-2xl font-semibold">₹{mockStats.totalSpent}</p>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Average Rating</h3>
        <div className="flex items-center">
          <span className="text-2xl font-semibold">{mockStats.averageRating}</span>
          <span className="text-yellow-400 ml-2">★</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Frequent Destinations</h3>
        <div className="space-y-2">
          {mockStats.frequentDestinations.map((dest, index) => (
            <div key={index} className="bg-gray-50 p-2 rounded dark:bg-gray-900 dark:text-gray-50"> 
              {dest}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
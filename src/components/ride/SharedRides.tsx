'use client'

import { useState } from 'react'
import { SharedRide } from '@/types'
import SharedRideDetails from './SharedRideDetails'
import SplitFare from './SplitFare'

// Mock shared rides data
const mockSharedRides: SharedRide[] = [
  {
    id: '1',
    rideId: 'RIDE001',
    sharingCode: 'SHARE123',
    totalFare: 450,
    numberOfPassengers: 3,
    splitAmount: 150,
    status: 'pending',
    passengers: [
      {
        id: '1',
        name: 'Isha Singh',
        phone: '9876543210',
        status: 'accepted',
        paymentStatus: 'completed'
      },
      {
        id: '2',
        name: 'Tanaya Burle',
        phone: '9876543211',
        status: 'pending',
        paymentStatus: 'pending'
      },
      {
        id: '3',
        name: 'John',
        phone: '9876543211',
        status: 'accepted',
        paymentStatus: 'completed'
      }
    ]
  },

  {
    id: '2',
    rideId: 'RIDE002',
    sharingCode: 'SHARE415',
    totalFare: 2800,
    numberOfPassengers: 4,
    splitAmount: 700,
    status: 'accepted',
    passengers: [
      {
        id: '1',
        name: 'Tanaya Burle',
        phone: '9876543211',
        status: 'accepted',
        paymentStatus: 'completed'
      },
      {
        id: '2',
        name: 'Lohan Verma',
        phone: '9116543211',
        status: 'accepted',
        paymentStatus: 'completed'
      },
      {
        id: '3',
        name: 'Yash Rana',
        phone: '9116577211',
        status: 'accepted',
        paymentStatus: 'completed'
      },{
        id: '4',
        name: 'Likhit',
        phone: '9116548080',
        status: 'accepted',
        paymentStatus: 'completed'
      }
    ]
  }
]

export default function SharedRides() {
  const [sharedRides] = useState<SharedRide[]>(mockSharedRides)
  const [activeRide, setActiveRide] = useState<string | null>(null)

  return (
    <div className="space-y-6 dark:bg-black dark:text-gray-50">
      {sharedRides.map((sharedRide) => (
        <div 
          key={sharedRide.id} 
          className={`bg-white rounded-lg shadow-md overflow-hidden
            ${activeRide === sharedRide.id ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div 
            className="p-4 cursor-pointer hover:bg-gray-50 dark:bg-black dark:text-gray-50 border-black"
            onClick={() => setActiveRide(
              activeRide === sharedRide.id ? null : sharedRide.id
            )}
          >
            <div className="flex justify-between items-start mb-2 dark:bg-black dark:text-gray-50">
              <div>
                <h3 className="font-semibold">Ride #{sharedRide.rideId}</h3>
                <p className="text-sm text-gray-500">
                  {sharedRide.numberOfPassengers} passengers
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  sharedRide.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : sharedRide.status === 'accepted'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {sharedRide.status.charAt(0).toUpperCase() + sharedRide.status.slice(1)}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div>
                <p className="text-gray-600 dark:bg-black dark:text-gray-50">Total Fare</p>
                <p className="font-semibold">₹{sharedRide.totalFare}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:bg-black dark:text-gray-50">Your Share</p>
                <p className="font-semibold text-blue-600">
                  ₹{sharedRide.splitAmount}
                </p>
              </div>
              <div>
                <p className="text-gray-600 ">Code</p>
                <p className="font-mono">{sharedRide.sharingCode}</p>
              </div>
            </div>
          </div>

          {activeRide === sharedRide.id && (
            <div className="border-t">
              <div className="p-4 space-y-4">
                <SharedRideDetails sharedRide={sharedRide} />
                <SplitFare sharedRide={sharedRide} />
              </div>
            </div>
          )}
        </div>
      ))}

      {sharedRides.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:bg-black dark:text-gray-50">No shared rides found</p>
          <p className="text-sm text-gray-400">
            Share a ride to split the fare with friends
          </p>
        </div>
      )}
    </div>
  )
}
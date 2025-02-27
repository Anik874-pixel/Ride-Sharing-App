'use client'

import { SharedRide } from '@/types'
import { useState } from 'react'

interface SharedRideDetailsProps {
  sharedRide: SharedRide;
}

export default function SharedRideDetails({ sharedRide }: SharedRideDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'accepted':
        return 'bg-blue-100 text-blue-800'
      case 'declined':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    return status === 'completed' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800'
  }

  return (
    <div className="bg-white rounded-lg p-4 dark:bg-black dark:text-gray-50">
      <div className="flex justify-between items-start mb-4 dark:bg-black dark:text-gray-50 ">
        <div>
          <h3 className="text-lg font-semibold ">Ride Details</h3>
          <p className="text-sm text-gray-500  ">
            Created on {new Date().toLocaleDateString()}
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            getStatusColor(sharedRide.status)
          }`}
        >
          {sharedRide.status.charAt(0).toUpperCase() + sharedRide.status.slice(1)}
        </span>
      </div>

      <div className="space-y-4 ">
        {/* Sharing Code */}
        <div className="bg-gray-50 p-3 rounded-lg dark:bg-black dark:text-gray-50">
          <p className="text-sm text-gray-600">Sharing Code</p>
          <div className="flex items-center space-x-2">
            <code className="text-lg font-mono">{sharedRide.sharingCode}</code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(sharedRide.sharingCode)
                alert('Sharing code copied!')
              }}
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Fare Details */}
        <div className="grid grid-cols-3 gap-4 bg-gray-50 p-3 rounded-lg dark:bg-gray-900 dark:text-gray-50">
          <div>
            <p className="text-sm text-gray-600">Total Fare</p>
            <p className="text-lg font-semibold">₹{sharedRide.totalFare}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Per Person</p>
            <p className="text-lg font-semibold text-blue-600">
              ₹{sharedRide.splitAmount}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Passengers</p>
            <p className="text-lg font-semibold">{sharedRide.numberOfPassengers}</p>
          </div>
        </div>

        {/* Passengers List */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">Passengers</p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              {isExpanded ? 'Show Less' : 'Show All'}
            </button>
          </div>
          
          <div className="space-y-2">
            {sharedRide.passengers
              .slice(0, isExpanded ? undefined : 2)
              .map((passenger) => (
                <div
                  key={passenger.id}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 dark:text-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{passenger.name}</p>
                    <p className="text-sm text-gray-500">{passenger.phone}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        getStatusColor(passenger.status)
                      }`}
                    >
                      {passenger.status}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        getPaymentStatusColor(passenger.paymentStatus)
                      }`}
                    >
                      {passenger.paymentStatus}
                    </span>
                  </div>
                </div>
              ))}
            
            {!isExpanded && sharedRide.passengers.length > 2 && (
              <p className="text-sm text-gray-500 text-center ">
                +{sharedRide.passengers.length - 2} more passengers
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-2 ">
          <button
            onClick={() => {/* Handle share again */}}
            className="flex-1 px-4 py-2 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50"
          >
            Share Again
          </button>
          <button
            onClick={() => {/* Handle cancel */}}
            className="flex-1 px-4 py-2 text-sm border border-red-500 text-red-500 rounded-md hover:bg-red-50"
            disabled={sharedRide.status === 'completed'}
          >
            Cancel Ride
          </button>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { SharedRide, Passenger } from '@/types'

interface ShareRideProps {
  rideId: string;
  fare: number;
  onClose: () => void;
}

interface PassengerInput {
  phone: string;
  error?: string;
}

export default function ShareRide({ rideId, fare, onClose }: ShareRideProps) {
  const [passengers, setPassengers] = useState<PassengerInput[]>([{ phone: '' }])
  const [copied, setCopied] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const sharingCode = 'SHARE' + rideId.slice(0, 6)

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone)
  }

  const handleAddPassenger = () => {
    if (passengers.length < 5) { // Maximum 5 co-passengers
      setPassengers([...passengers, { phone: '' }])
    }
  }

  const handleRemovePassenger = (index: number) => {
    const newPassengers = passengers.filter((_, i) => i !== index)
    setPassengers(newPassengers)
  }

  const handlePassengerChange = (index: number, value: string) => {
    const newPassengers = [...passengers]
    newPassengers[index] = {
      phone: value,
      error: value && !validatePhoneNumber(value) ? 'Enter valid 10-digit number' : undefined
    }
    setPassengers(newPassengers)
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(sharingCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShareRide = async () => {
    if (passengers.some(p => p.error || !p.phone)) {
      alert('Please enter valid phone numbers for all passengers')
      return
    }

    setIsSharing(true)
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would typically make an API call to your backend
      const sharedRide: SharedRide = {
        id: Math.random().toString(36).substr(2, 9),
        rideId,
        sharingCode,
        totalFare: fare,
        numberOfPassengers: passengers.length + 1,
        splitAmount: fare / (passengers.length + 1),
        status: 'pending',
        passengers: passengers.map((p): Passenger => ({
          id: Math.random().toString(36).substr(2, 9),
          name: 'Pending',
          phone: p.phone,
          status: 'pending',
          paymentStatus: 'pending'
        }))
      }

      console.log('Shared ride created:', sharedRide)
      onClose()
    } catch (error) {
      console.error('Error sharing ride:', error)
      alert('Failed to share ride. Please try again.')
    } finally {
      setIsSharing(false)
    }
  }

  const splitAmount = (fare / (passengers.length + 1)).toFixed(2)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Share Ride</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600">Sharing Code:</p>
            <div className="flex items-center space-x-2 mt-1">
              <code className="bg-gray-100 px-3 py-1 rounded text-lg font-mono">
                {sharingCode}
              </code>
              <button
                onClick={handleCopyCode}
                className="text-blue-500 hover:text-blue-600"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Fare Split:</p>
              <p className="text-2xl font-semibold">₹{splitAmount}/person</p>
              <p className="text-sm text-gray-500">
                Total fare: ₹{fare} split among {passengers.length + 1} people
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="font-medium">Add Co-Passengers:</p>
                {passengers.length < 5 && (
                  <button
                    onClick={handleAddPassenger}
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    + Add Another
                  </button>
                )}
              </div>
              
              {passengers.map((passenger, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <input
                        type="tel"
                        value={passenger.phone}
                        onChange={(e) => handlePassengerChange(index, e.target.value)}
                        placeholder="Enter 10-digit phone number"
                        className={`w-full border rounded-md p-2 ${
                          passenger.error ? 'border-red-500' : ''
                        }`}
                        maxLength={10}
                      />
                      {passenger.error && (
                        <p className="text-red-500 text-xs mt-1">{passenger.error}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemovePassenger(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleShareRide}
            disabled={isSharing || passengers.some(p => p.error || !p.phone)}
            className={`flex-1 px-4 py-2 rounded-md ${
              isSharing || passengers.some(p => p.error || !p.phone)
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isSharing ? 'Sharing...' : 'Share Ride'}
          </button>
        </div>
      </div>
    </div>
  )
}
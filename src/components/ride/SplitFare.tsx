'use client'

import { useState } from 'react'
import { SharedRide } from '@/types'

interface SplitFareProps {
  sharedRide: SharedRide;
}

export default function SplitFare({ sharedRide }: SplitFareProps) {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending')

  const handlePayShare = async () => {
    setPaymentStatus('processing')
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setPaymentStatus('completed')
      // Here you would typically make an API call to your backend
    } catch (error) {
      console.error('Payment failed:', error)
      setPaymentStatus('pending')
      alert('Payment failed. Please try again.')
    }
  }

  return (
    <div className="bg-white rounded-lg p-4 border dark:bg-black dark:text-gray-50">
      <h3 className="text-lg font-semibold mb-4">Pay Your Share</h3>

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg dark:bg-gray-900 dark:text-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 ">Your Share</p>
              <p className="text-2xl font-semibold">₹{sharedRide.splitAmount}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Fare</p>
              <p className="text-gray-500">₹{sharedRide.totalFare}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handlePayShare}
          disabled={paymentStatus !== 'pending'}
          className={`w-full py-2 px-4 rounded-md ${
            paymentStatus === 'completed'
              ? 'bg-green-500 text-white'
              : paymentStatus === 'processing'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {paymentStatus === 'completed'
            ? '✓ Paid'
            : paymentStatus === 'processing'
            ? 'Processing...'
            : 'Pay Your Share'}
        </button>

        {paymentStatus === 'completed' && (
          <div className="text-center text-sm text-green-600">
            Payment successful! Thank you.
          </div>
        )}
      </div>
    </div>
  )
}
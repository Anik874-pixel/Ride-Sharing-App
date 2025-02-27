'use client'

import { useState } from 'react'
import { PaymentHistory } from '@/types/payment'

// Mock payment history data
const mockPaymentHistory: PaymentHistory[] = [
  {
    id: '1',
    amount: 450,
    date: '2024-03-19T10:30:00',
    status: 'completed',
    paymentMethod: 'Visa ending in 4242',
    rideId: 'RIDE001'
  },
  {
    id: '2',
    amount: 350,
    date: '2024-03-18T15:45:00',
    status: 'completed',
    paymentMethod: 'Mastercard ending in 5555',
    rideId: 'RIDE002'
  },
  {
    id: '3',
    amount: 550,
    date: '2024-03-17T09:15:00',
    status: 'failed',
    paymentMethod: 'Visa ending in 4242',
    rideId: 'RIDE003'
  }
]

export default function PaymentHistoryComponent() {
  const [payments] = useState<PaymentHistory[]>(mockPaymentHistory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 dark:bg-black dark:gray-50">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>

      <div className="space-y-4">
        {payments.map(payment => (
          <div 
            key={payment.id}
            className="border rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">₹{payment.amount}</p>
                <p className="text-sm text-gray-400">
                  {formatDate(payment.date)}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  payment.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : payment.status === 'failed'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
            </div>

            <div className="text-sm text-gray-500">
              <p>Payment Method: {payment.paymentMethod}</p>
              <p>Ride ID: {payment.rideId}</p>
            </div>
          </div>
        ))}

        {payments.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No payment history available
          </p>
        )}
      </div>
    </div>
  )
}
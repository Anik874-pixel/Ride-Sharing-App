'use client'

import { useState } from 'react'
import { PaymentMethod } from '@/types/payment'

// Card brand logos as components
const CardLogos = {
  Visa: () => (
    <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none">
      <rect width="48" height="32" rx="4" fill="#1434CB"/>
      <path d="M18.5 21.5H15L17.5 10.5H21L18.5 21.5Z" fill="white"/>
      <path d="M28.5 10.7C27.8 10.5 26.7 10.3 25.4 10.3C22.1 10.3 19.8 12 19.8 14.4C19.8 16.2 21.4 17.2 22.7 17.8C24 18.4 24.4 18.8 24.4 19.3C24.4 20.1 23.4 20.5 22.4 20.5C21.1 20.5 20.3 20.3 19.2 19.8L18.7 19.6L18.2 22.4C19 22.7 20.4 23 21.9 23C25.4 23 27.7 21.3 27.7 18.8C27.7 17.3 26.7 16.2 24.7 15.3C23.5 14.7 22.8 14.3 22.8 13.7C22.8 13.2 23.4 12.7 24.7 12.7C25.8 12.7 26.6 12.9 27.2 13.1L27.6 13.2L28.1 10.7H28.5Z" fill="white"/>
      <path d="M33 10.5H35.7L38.7 21.5H35.5C35.5 21.5 35.2 20.4 35.1 20.1H31.1C31 20.5 30.6 21.5 30.6 21.5H27L31.8 11.3C32.1 10.7 32.5 10.5 33 10.5ZM32 17.8H34.6L33.3 13.8L32 17.8Z" fill="white"/>
      <path d="M13.1 10.5L10 18.1L9.7 16.9C9.1 15.3 7.6 13.5 5.9 12.5L8.8 21.5H12.1L17.2 10.5H13.1Z" fill="white"/>
      <path d="M6.8 10.5H2L1.9 10.7C5.4 11.6 7.7 13.9 8.7 16.7L7.7 11.3C7.5 10.7 7.2 10.5 6.8 10.5Z" fill="#F7B600"/>
    </svg>
  ),
  Mastercard: () => (
    <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none">
      <rect width="48" height="32" rx="4" fill="#F7F7F7"/>
      <circle cx="18" cy="16" r="8" fill="#EB001B"/>
      <circle cx="30" cy="16" r="8" fill="#F79E1B"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M24 21.9C26.1 20.3 27.5 17.8 27.5 15C27.5 12.2 26.1 9.7 24 8.1C21.9 9.7 20.5 12.2 20.5 15C20.5 17.8 21.9 20.3 24 21.9Z" fill="#FF5F00"/>
    </svg>
  )
}

// Mock data for payment methods
const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2024,
    isDefault: true
  },
  {
    id: '2',
    type: 'card',
    last4: '5555',
    brand: 'Mastercard',
    expiryMonth: 8,
    expiryYear: 2025,
    isDefault: false
  }
]

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods)

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    )
  }

  const handleRemove = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id))
  }

  const CardLogo = ({ brand }: { brand: string }) => {
    const Logo = CardLogos[brand as keyof typeof CardLogos]
    return Logo ? <Logo /> : <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-sm">{brand}</div>
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 dark:bg-black dark:gray-50">
      <h2 className="text-xl font-semibold mb-4">Saved Payment Methods</h2>
      
      <div className="space-y-4">
        {paymentMethods.map(method => (
          <div 
            key={method.id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <CardLogo brand={method.brand} />
              
              <div>
                <p className="font-medium">
                  {method.brand} ending in {method.last4}
                </p>
                <p className="text-sm text-gray-500">
                  Expires {method.expiryMonth}/{method.expiryYear}
                </p>
                {method.isDefault && (
                  <span className="text-sm text-green-600">Default</span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {!method.isDefault && (
                <button
                  onClick={() => handleSetDefault(method.id)}
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  Set Default
                </button>
              )}
              <button
                onClick={() => handleRemove(method.id)}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {paymentMethods.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No payment methods added yet
          </p>
        )}
      </div>
    </div>
  )
}
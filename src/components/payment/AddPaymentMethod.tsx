'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

// Initialize Stripe outside of the component to ensure it isn't recreated every time
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

function CardForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)
    setError(null)

    try {
      const cardElement = elements.getElement(CardElement)

      if (!cardElement) {
        throw new Error('Card element not found')
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      })

      if (error) {
        throw new Error(error.message)
      }

      if (paymentMethod) {
        console.log('Payment Method Created:', paymentMethod)

        // Clear card element and show success
        cardElement.clear()
        setSuccess(true)
        
        // Reset the success state after 3 seconds
        setTimeout(() => {
          setSuccess(false) // Reset the success state
        }, 3000)
      }
    } 
   // catch (err: any) {
     // setError(err.message || 'Something went wrong')
    finally {
      setProcessing(false)
    }
  }

  return (
    <>
      {/* Test Cards Information Box */}
      <div className="mb-6 bg-blue-50 p-4 rounded-lg dark:bg-black dark:text-gray-50">
        <h3 className="text-sm font-medium text-blue-800 mb-2 dark:text-blue-500">Test Card Details</h3>
        <div className="text-sm text-blue-700 dark:text-blue-500 space-y-2">
          <p className="font-medium">Use these test card numbers:</p>
          <div className="bg-white p-3 rounded border border-gray-500 dark:bg-black">
            <p className="font-medium text-blue-900 dark:text-blue-500 mb-1">Successful Payments:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-500">
              <li>Visa: 4242 4242 4242 4242</li>
              <li>Mastercard: 5555 5555 5555 4444</li>
            </ul>
          </div>

          <div className="bg-white p-3 rounded border border-gray-500 dark:bg-black">
            <p className="font-medium text-blue-900 mb-1 dark:text-blue-500">For all cards, use:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-500">
              <li>Expiry Date: Any future date (MM/YY)</li>
              <li>CVC: Any 3 digits</li>
              <li>ZIP: Any 5 digits</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Card Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border rounded-md p-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 dark:bg-black p-2 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-500 text-sm bg-green-50 dark:bg-black p-2 rounded ">
            Card added successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || processing}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600  
            ${(!stripe || processing) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {processing ? 'Processing...' : 'Add Payment Method'}
        </button>
      </form>
    </>
  )
}

export default function AddPaymentMethod() {
  return (
    <div className="bg-white rounded-lg shadow p-6 dark:bg-black dark:text-gray-50">
      <h2 className="text-xl font-semibold mb-4">Add New Payment Method</h2>
      <Elements stripe={stripePromise}>
        <CardForm />
      </Elements>
    </div>
  )
}
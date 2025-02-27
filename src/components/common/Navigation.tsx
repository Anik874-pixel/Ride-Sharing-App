'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-md mb-6 dark:bg-black dark:text-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex space-x-8">
          <Link 
            href="/dashboard"
            className={`py-3 px-5 text-md font-semibold border-b-2 rounded-md transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 hover:shadow-lg ${
              pathname === '/dashboard' 
                ? 'border-blue-500 text-blue-600 bg-blue-50 dark:bg-black dark:text-gray-50'  // Active button styling
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:bg-black dark:text-gray-50 dark:hover:bg-gray-900'  // Hover effect
            }`}
          >
            <span role="img" aria-label="book ride">🛸</span> 
            <span>Book Ride</span>
          </Link>
          <Link 
            href="/dashboard/history"
            className={`py-3 px-5 text-md font-semibold border-b-2 rounded-md transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 hover:shadow-lg dark:bg-black dark:text-gray-50 ${
              pathname === '/dashboard/history'
                ? 'border-blue-500 text-blue-600 bg-blue-50'  // Active button styling
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'  // Hover effect
            }`}
          >
            <span role="img" aria-label="ride history">📚</span> 
            <span>Ride History</span>
          </Link>
          <Link 
            href="/dashboard/profile"
            className={`py-3 px-5 text-md font-semibold border-b-2 rounded-md transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 hover:shadow-lg dark:bg-black dark:text-gray-50  ${
              pathname === '/dashboard/profile'
                ? 'border-blue-500 text-blue-600 bg-blue-50'  // Active button styling
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'  // Hover effect
            }`}
          >
            <span role="img" aria-label="profile">👑</span> 
            <span>Profile</span>
          </Link>
          <Link 
            href="/dashboard/payment"
            className={`py-3 px-5 text-md font-semibold border-b-2 rounded-md transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 hover:shadow-lg dark:bg-black dark:text-gray-50 ${
              pathname === '/dashboard/payment'
                ? 'border-blue-500 text-blue-600 bg-blue-50'  // Active button styling
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'  // Hover effect
            }`}
          >
            <span role="img" aria-label="payment">💳</span> 
            <span>Payment</span>
          </Link>
          <Link 
            href="/dashboard/shared-rides"
            className={`py-3 px-5 text-md font-semibold border-b-2 rounded-md transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 hover:shadow-lg dark:bg-black dark:text-gray-50 ${
              pathname === '/dashboard/shared-rides'
                ? 'border-blue-500 text-blue-600 bg-blue-50'  // Active button styling
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'  // Hover effect
            }`}
          >
            <span role="img" aria-label="shared rides">🚗</span> 
            <span>Shared Rides</span>
          </Link>
          <Link
           href="/dashboard/chat"
           className={`py-3 px-5 text-md font-semibold border-b-2 rounded-md transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 hover:shadow-lg dark:bg-black dark:text-gray-50 ${
            pathname === '/dashboard/chat'
              ? 'border-blue-500 text-blue-600 bg-blue-50'  // Active button styling
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'  // Hover effect
          }`}
           >
            <span role="img" aria-label="chat box">💬</span> 
            <span>Chat Box</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
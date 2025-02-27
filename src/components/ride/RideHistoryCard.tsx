'use client'

import { useState } from 'react';
import { RideHistory } from '@/types/ride';
import Rating from '@/components/common/Rating';

interface RideHistoryCardProps {
  ride: RideHistory;
}

export default function RideHistoryCard({ ride }: RideHistoryCardProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(ride.feedback || '');
  const [rating, setRating] = useState(ride.rating || 0);

  // Format date without date-fns
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const handleSubmitFeedback = () => {
    // In a real app, this would make an API call
    console.log('Feedback submitted:', { rating, feedback, rideId: ride.id });
    setShowFeedback(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow dark:bg-black dark:text-gray-50">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-50">
            {formatDate(ride.date)}
          </p>
          <h3 className="font-semibold capitalize">{ride.rideType} Ride</h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            ride.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {ride.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-start">
          <div className="w-4 h-4 mt-1 rounded-full bg-blue-500 shrink-0" />
          <p className="ml-3 text-gray-600 dark:text-gray-50">{ride.pickup}</p>
        </div>
        <div className="flex items-start">
          <div className="w-4 h-4 mt-1 rounded-full bg-green-500 shrink-0" />
          <p className="ml-3 text-gray-600 dark:text-gray-50">{ride.destination}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-3 border-t">
        <div className="text-gray-600 dark:text-gray-50">
          <span className="font-medium">Driver: </span>
          {ride.driverName}
        </div>
        <div className="text-lg font-semibold">₹{ride.fare}</div>
      </div>

      {/* Rating Section */}
      {ride.status === 'completed' && (
        <div className="mt-4 pt-3 border-t">
          {!showFeedback && !rating ? (
            <button
              onClick={() => setShowFeedback(true)}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              Rate this ride
            </button>
          ) : (
            <div className="space-y-3">
              {showFeedback ? (
                <>
                  <p className="text-sm font-medium text-gray-700">Rate your experience</p>
                  <Rating 
                    initialRating={rating} 
                    onRate={(newRating: number) => setRating(newRating)} 
                  />
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your feedback (optional)"
                    className="w-full p-2 border rounded-md text-sm"
                    rows={3}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSubmitFeedback}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setShowFeedback(false)}
                      className="px-4 py-2 text-gray-600 rounded-md text-sm hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Rating 
                    initialRating={rating} 
                    onRate={() => setShowFeedback(true)} 
                  />
                  {feedback && (
                    <p className="text-sm text-gray-500 ml-2">"{feedback}"</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
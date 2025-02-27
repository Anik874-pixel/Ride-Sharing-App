'use client'

import { useState } from 'react'

interface RatingProps {
  initialRating?: number;
  onRate: (rating: number) => void;
}

export default function Rating({ initialRating = 0, onRate }: RatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`text-2xl transition-colors ${
            star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => {
            setRating(star);
            onRate(star);
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </button>
      ))}
    </div>
  );
}
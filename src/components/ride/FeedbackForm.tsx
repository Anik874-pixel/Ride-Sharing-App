"use client";

import { useState } from "react";

interface FeedbackFormProps {
  rideId: string;
  onSubmit: (rating: number, comment: string) => void;
}

export default function FeedbackForm({ rideId, onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }
    onSubmit(rating, comment);
    setRating(0);
    setComment("");
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h3 className="text-lg font-semibold mb-2">Rate Your Ride</h3>

      {/* Star Rating */}
      <div className="flex space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-2xl ${
              rating >= star ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Comment Box */}
      <textarea
        className="w-full p-2 border rounded-md text-sm"
        rows={3}
        placeholder="Leave a comment (optional)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
      >
        Submit Feedback
      </button>
    </div>
  );
}

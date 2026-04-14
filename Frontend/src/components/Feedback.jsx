import React, { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // your auth token

      await axios.post(
  "http://localhost:5000/api/feedback",
  {
    rating,
    satisfied: rating >= 3,
    comment: feedback
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);


      setSubmitted(true);
    } catch (err) {
      console.error("Feedback submit error:", err);
      alert("Failed to submit feedback");
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-2">
        We Value Your Feedback
      </h2>

      {submitted ? (
        <div className="text-green-600 font-semibold text-center py-4">
           Thank you for your valuable feedback!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <p className="text-gray-600 text-center mb-4">
            How accurate was your recommendation
          </p>

          {/* ⭐ Rating */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className={`cursor-pointer transition-all duration-200 ${
                  star <= (hover || rating)
                    ? "text-yellow-400 fill-yellow-400 scale-110"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* 📝 Comment */}
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what you liked or what could be improved..."
            rows="4"
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 resize-none shadow-sm"
          />

          {/* 🚀 Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      )}
    </div>
  );
}


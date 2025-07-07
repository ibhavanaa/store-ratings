import React, { useState } from 'react';

function StoreCard({ store, token, role }) {
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');

  const handleRate = async () => {
    try {
      const res = await fetch(`http://localhost:10000/api/stores/rate/${store.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating_value: parseInt(rating) }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Rating submitted!');
      } else {
        setMessage(data.error || '❌ Rating failed!');
      }
    } catch (err) {
      console.error('Error submitting rating:', err);
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h3 className="text-lg font-bold mb-1">{store.name}</h3>
      <p className="text-sm text-gray-600">{store.address}</p>
      <p className="text-xs text-gray-400">{store.email}</p>

      {store.average_rating && (
        <p className="mt-2 text-yellow-700 font-medium">
          ⭐ Average Rating: {Number(store.average_rating).toFixed(1)}
        </p>
      )}

      {role === 'USER' && (
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Submit your rating (1–5)
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <button
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            onClick={handleRate}
          >
            Submit Rating
          </button>
          {message && <p className="text-green-600 text-sm mt-1">{message}</p>}
        </div>
      )}
    </div>
  );
}

export default StoreCard;

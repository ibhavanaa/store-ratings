// ========== src/pages/Dashboard.jsx ==========
import React, { useEffect, useState } from 'react';
import StoreCard from '../components/StoreCard.jsx';
import AddStore from '../components/AddStore';

function Dashboard({ token }) {
  const role = localStorage.getItem('role');
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [ownerRatings, setOwnerRatings] = useState([]);

  useEffect(() => {
  const fetchAll = async () => {
    await fetchStores();
    if (role === 'OWNER') await fetchOwnerRatings();
  };
  fetchAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [role]);


  const fetchStores = async () => {
    try {
      const res = await fetch('http://localhost:10000/api/stores');
      const data = await res.json();
      setStores(data);
    } catch (err) {
      console.error("❌ Failed to fetch stores:", err);
    }
  };

  const fetchOwnerRatings = async () => {
    try {
      const res = await fetch('http://localhost:10000/api/stores/ratings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setOwnerRatings(data);
    } catch (err) {
      console.error("❌ Failed to fetch ratings:", err);
    }
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    
    <div className="min-h-screen bg-gray-100 p-6">
      <p className="text-red-600">🧪 Dashboard Rendering Correctly</p>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {role}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {role === 'OWNER' && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Your Store Ratings</h2>
          {ownerRatings.length === 0 ? (
            <p className="text-gray-600">No ratings submitted yet.</p>
          ) : (
            <ul className="space-y-2">
              {ownerRatings.map((r, idx) => (
                <li key={idx} className="bg-white p-4 rounded shadow">
                  <p className="text-gray-800">User: {r.user}</p>
                  <p className="text-gray-600">Rating: {r.rating_value}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {role === 'OWNER' && (
        <div className="mb-8">
          <AddStore token={token} onStoreAdded={fetchStores} />
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search stores by name or address"
          className="w-full border p-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {filteredStores.map((store) => {
    console.log("📦 Rendering store:", store.name, "Role:", role);
    return (
      <StoreCard
        key={store.id}
        store={store}
        token={token}
        role={role}
      />
    );
  })}
</div>

    </div>
  );
}

export default Dashboard;

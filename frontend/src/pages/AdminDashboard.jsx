import React, { useEffect, useState } from 'react';
import AdminStats from '../components/AdminStats'; // ✅ import reusable component

function AdminDashboard({ token }) {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    const statsRes = await fetch('http://localhost:10000/api/admin/stats', { headers });
    const usersRes = await fetch('http://localhost:10000/api/users', { headers });
    const storesRes = await fetch('http://localhost:10000/api/stores', { headers });

    setStats(await statsRes.json());
    setUsers(await usersRes.json());
    setStores(await storesRes.json());
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(filter.toLowerCase()) ||
      u.email?.toLowerCase().includes(filter.toLowerCase()) ||
      u.address?.toLowerCase().includes(filter.toLowerCase()) ||
      u.role?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AdminStats label="Total Users" value={stats.users || 0} />
        <AdminStats label="Total Stores" value={stats.stores || 0} />
        <AdminStats label="Total Ratings" value={stats.ratings || 0} />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">User List</h2>
        <input
          className="border p-2 rounded w-full mb-4"
          placeholder="Search by name, email, address, role"
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="grid gap-4">
          {filteredUsers.map((u) => (
            <div key={u.id} className="bg-white p-4 rounded shadow">
              <p><strong>Name:</strong> {u.name}</p>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Address:</strong> {u.address}</p>
              <p><strong>Role:</strong> {u.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

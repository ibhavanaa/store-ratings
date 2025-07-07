// src/components/AddUserForm.jsx
import React, { useState } from 'react';

function AddUserForm({ token, onUserAdded }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER',
    address: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:10000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('User created!');
      onUserAdded();
      setForm({ name: '', email: '', password: '', role: 'USER', address: '' });
    } else {
      setMessage(data.error || 'Failed to add user');
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded mb-6">
      <h3 className="text-lg font-semibold mb-2">Add New User</h3>
      {message && <p className="text-sm text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full border p-2 rounded"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <select
          className="w-full border p-2 rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="OWNER">Store Owner</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Create User
        </button>
      </form>
    </div>
  );
}

export default AddUserForm;

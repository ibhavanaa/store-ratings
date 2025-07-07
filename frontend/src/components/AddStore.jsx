import React, { useState } from 'react';

function AddStore({ token }) {
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:10000/api/stores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">Add New Store</h2>
      <input
        className="w-full border p-2 rounded"
        placeholder="Store Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Address"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Store
      </button>
    </form>
  );
}

export default AddStore;

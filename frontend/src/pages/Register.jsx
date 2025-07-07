// src/pages/Register.jsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import bgImage from '../assets/login-bg.jpg';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '', address: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const infoMessage = location.state?.msg || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('http://localhost:10000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      setSuccess('Registration successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(data.error || 'Something went wrong');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-0" />
      <div className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md shadow-2xl rounded-xl p-10 w-full max-w-md border border-white border-opacity-40">
        <h1 className="text-gray-800 text-3xl font-extrabold text-center mb-6 tracking-wide">
          Register New User
        </h1>

        {infoMessage && (
          <div className="bg-yellow-100 text-yellow-700 text-sm px-4 py-2 mb-4 rounded">
            {infoMessage}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 text-sm px-4 py-2 mb-4 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full px-4 py-2 border rounded"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <select
            className="w-full px-4 py-2 border rounded"
            required
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="USER">User</option>
            <option value="OWNER">Store Owner</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;

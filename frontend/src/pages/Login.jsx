// src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/login-bg.jpg';
import { Eye, EyeOff } from 'lucide-react';

function Login({ setToken, setRole }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:10000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        setToken(data.token);
        setRole(data.role);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        navigate('/dashboard');
      } else {
        if (data.error === 'User not found') {
          navigate('/register', { state: { msg: 'Please register before logging in' } });
        } else {
          setError(data.error || 'Login failed');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-0" />

      <div className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md shadow-2xl rounded-xl p-10 w-full max-w-md border border-white border-opacity-40 transform transition hover:scale-[1.02] hover:shadow-blue-300/40">
        <h1 className="text-gray-800 text-3xl font-extrabold text-center mb-6 tracking-wide drop-shadow">
          Store Ratings Portal
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-3 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded transition duration-200 shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-gray-600 text-xs text-center mt-6">
          Single login for all users: Admin / Owner / User
        </p>

        <p className="text-center text-sm text-gray-600 mt-2">
          Not registered?{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

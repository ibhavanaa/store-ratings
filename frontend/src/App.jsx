import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [role, setRole] = useState(() => localStorage.getItem('role'));

  // ✅ Always sync state with localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken !== token) setToken(storedToken);
    if (storedRole !== role) setRole(storedRole);
  }, [token, role]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} setRole={setRole} />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
  path="/dashboard"
  element={
    token && role ? (
      <Dashboard token={token} role={role} setToken={setToken} />
    ) : token && !role ? (
      <p className="text-center p-10 text-lg font-medium">Loading dashboard...</p>
    ) : (
      <Navigate to="/login" />
    )
  }
/>

      </Routes>
    </Router>
  );
}

export default App;

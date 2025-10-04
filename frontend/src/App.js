import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [backendStatus, setBackendStatus] = useState('');

  // Fetch users from backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      setUsers(response.data);
      setMessage('');
    } catch (error) {
      setMessage(`Error fetching users: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Add new user
  const addUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users`, newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '' });
      setMessage('User added successfully!');
    } catch (error) {
      setMessage(`Error adding user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Check backend health
  const checkBackendHealth = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/health`);
      setBackendStatus(`Backend is healthy! Uptime: ${Math.floor(response.data.uptime)}s`);
    } catch (error) {
      setBackendStatus(`Backend connection failed: ${error.message}`);
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
    checkBackendHealth();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>🚀 Simple Full-Stack App</h1>
        <p>React Frontend + Express Backend</p>
      </div>

      {/* Backend Status */}
      <div className="card">
        <h2>🔗 Backend Status</h2>
        <p>{backendStatus}</p>
        <button className="btn" onClick={checkBackendHealth}>
          Check Health
        </button>
      </div>

      {/* Add User Form */}
      <div className="card">
        <h2>➕ Add New User</h2>
        <form onSubmit={addUser}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Enter user name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="Enter user email"
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add User'}
          </button>
        </form>
      </div>

      {/* Users List */}
      <div className="card">
        <h2>👥 Users List</h2>
        <button className="btn" onClick={fetchUsers} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh Users'}
        </button>
        
        {message && (
          <div className={`status ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        {loading && users.length === 0 ? (
          <div className="loading">Loading users...</div>
        ) : (
          <div className="user-list">
            {users.map((user) => (
              <div key={user.id} className="user-item">
                <h3>{user.name}</h3>
                <p>📧 {user.email}</p>
                {user.createdAt && (
                  <p>🕒 Created: {new Date(user.createdAt).toLocaleString()}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API Info */}
      <div className="card">
        <h2>🔧 API Information</h2>
        <p><strong>Backend URL:</strong> {API_BASE_URL}</p>
        <p><strong>Environment:</strong> {process.env.NODE_ENV || 'development'}</p>
        <div style={{ marginTop: '20px' }}>
          <h3>Available Endpoints:</h3>
          <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li><code>GET /</code> - Welcome message</li>
            <li><code>GET /api/health</code> - Health check</li>
            <li><code>GET /api/users</code> - Get all users</li>
            <li><code>POST /api/users</code> - Create new user</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

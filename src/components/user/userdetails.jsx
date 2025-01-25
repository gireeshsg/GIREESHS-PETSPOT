import React, { useEffect, useState, useContext } from 'react';
import { mycontext } from '../Context';
import axios from 'axios';
import './userr.css';

const UserDetails = () => {
  const { email, setEmail } = useContext(mycontext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [banReason, setBanReason] = useState('');
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/useres', { withCredentials: true });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBanUser = async (userEmail) => {
    try {
      const response = await axios.post('http://localhost:5000/user/ban', {
        email: userEmail,
        reason: banReason,
      }, { withCredentials: true });

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.email === userEmail
            ? { ...user, isBanned: true }
            : user
        )
      );

      setMessage(`User banned successfully: ${response.data.user.email}`);
      setError('');
      alert(`User has been banned for: ${banReason}`);
      setBanReason('');
    } catch (error) {
      setError(`Error banning user: ${error.response ? error.response.data : error.message}`);
      setMessage('');
    }
  };

  const handleUnbanUser = async (userEmail) => {
    try {
      const response = await axios.post('http://localhost:5000/user/unban', { email: userEmail }, { withCredentials: true });

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.email === userEmail ? { ...user, isBanned: false } : user
        )
      );

      setMessage(`User unbanned successfully: ${response.data.user.email}`);
      setError('');
    } catch (error) {
      setError(`Error unbanning user: ${error.response ? error.response.data : error.message}`);
      setMessage('');
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="user-details-container">
      <h1 className="page-heading">User List</h1>

      <input
        className="ban-reason-input"
        type="text"
        value={banReason}
        onChange={(e) => setBanReason(e.target.value)}
        placeholder="Enter ban reason"
      />

      <ul className="user-list">
        {users.map(user => (
          <li key={user.email} className={`user-item ${user.isBanned ? 'banned' : ''}`}>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
              {user.isBanned && <span className="banned-tag">(Banned)</span>}
            </div>
            <div className="user-actions">
              {user.isBanned ? (
                <button className="unban-button" onClick={() => handleUnbanUser(user.email)}>Unban User</button>
              ) : (
                <button className="ban-button" onClick={() => handleBanUser(user.email)}>Ban User</button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default UserDetails;

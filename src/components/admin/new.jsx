import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagementt = () => {
  const [users, setUsers] = useState([]);
  const [reason, setReason] = useState('');

  useEffect(() => {
    // Fetch users from your API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users'); // Adjust the endpoint
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleBanUser = async (email) => {
    try {
      await axios.post('http://localhost:5000/user/ban', { email, reason });
      setUsers(users.map(user => user.email === email ? { ...user, isBanned: true, banReason: reason } : user));
      alert("User banned successfully!");
    } catch (error) {
      console.error("Ban user failed:", error);
      alert("Failed to ban user: " + error.response?.data?.message);
    }
  };

  const handleUnbanUser = async (email) => {
    try {
      await axios.post('http://localhost:5000/user/unban', { email });
      setUsers(users.map(user => user.email === email ? { ...user, isBanned: false, banReason: null } : user));
      alert("User unbanned successfully!");
    } catch (error) {
      console.error("Unban user failed:", error);
      alert("Failed to unban user: " + error.response?.data?.message);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <input
        type="text"
        placeholder="Ban reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.isBanned ? 'Banned' : 'Active'}</td>
              <td>
                {user.isBanned ? (
                  <button onClick={() => handleUnbanUser(user.email)}>Unban</button>
                ) : (
                  <button onClick={() => handleBanUser(user.email)}>Ban</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementt;

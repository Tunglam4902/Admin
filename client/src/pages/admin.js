import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:8080/api/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const updateUserRoles = (userId, role) => {
    axios.put('http://localhost:8080/api/update_role', {
      id: userId,
      role: { id: role }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.data.code === '200') {
        console.log('Role updated successfully');
        
        setUsers(users.map(user => user.id === userId ? {...user, role: {id: role}} : user));
      } else {
        console.log(response.data.Message);
      }
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  };

  const renderUser = (user) => (
    <div key={user.id} className='admin-userlist'>
      <div className='user-info'>
        <strong>Username:</strong> {user.username}, <strong>User ID:</strong> {user.id}
      </div>
      <div className='role-selection'>
        {renderCheckbox('Admin', 3, user)}
        {renderCheckbox('User', 1, user)}
        {renderCheckbox('Moderator', 2, user)}
      </div>
    </div>
  );

  const renderCheckbox = (label, role, user) => (
    <>
      <label htmlFor={`roleSelect_${user.id}_${role}`}>{label}:</label>
      <input
        id={`roleSelect_${user.id}_${role}`}
        type="checkbox"
        checked={user.role.id === role}
        onChange={() => updateUserRoles(user.id, role)}
      />
    </>
  );

  return (
    <div className='admin-container'>
      <h1>Admin</h1>
      {users.map(renderUser)}
    </div>
  );
};

export default Admin;
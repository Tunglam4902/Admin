import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Checkbox, Table } from 'antd';


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
          setUsers(users.map(user => user.id === userId ? { ...user, role: { id: role } } : user));
          console.log(users);
        } else {
          console.log(response.data.Message);
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const renderUser = (user) => (
          <Checkbox.Group
            options={[
              { label: 'Admin', value: 3 },
              { label: 'User', value: 1 },
              { label: 'Moderator', value: 2 },
            ]}
            value={[user.role.id]}
            onChange={(checkedValues) => updateUserRoles(user.id, checkedValues.filter(item=> item !== user.role.id)[0])}
          />
  );

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Role",
      key: "action",
      render: (_, record) => (renderUser(record))
    }]

  return (
    <div className='admin-container'>
      <h1>User Management</h1>
      <Table dataSource={users} columns={columns} rowKey={record => record.id} />
    </div>
  );
};

export default Admin;

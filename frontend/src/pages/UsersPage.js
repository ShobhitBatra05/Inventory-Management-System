import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser,deleteUser,changeUserRole, toggleUserStatus} from '../services/userService';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Employee',
    isActive: false,
  });
  // const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      response.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
      setUsers(response);
      console.log(response)
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setFormData({ name: '', email: '', role: 'Employee', isActive: false });
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await updateUser(selectedUser._id,formData)
      } else {
        await addUser(formData);
      }
      loadUsers();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await changeUserRole(userId, newRole);
      loadUsers();
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      await toggleUserStatus(userId, !currentStatus);
      loadUsers();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded">
        <MdAdd className='inline-block'/> Add User</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">Name</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">Email</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">Role</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">Status</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {console.log(users)}
            {
            users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                    <option value="Supplier">Supplier</option>
                    <option value="Customer">Customer</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleStatusToggle(user._id, user.isActive)}
                    className={`px-2 py-1 rounded ${user.isActive ? 'bg-green-500' : 'bg-red-500'} text-white`}
                  >
                    {user.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit <FaEdit className='inline-block'/>
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete <MdDelete className='inline-block' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{selectedUser ? 'Edit User' : 'Add User'}</h2>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-between mb-4">
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="border rounded px-2 py-1"
              >
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
                <option value="Supplier">Supplier</option>
                <option value="Customer">Customer</option>
              </select>
              <div className="flex items-center">
                <span className="mr-2">Active</span>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="form-checkbox"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={handleSaveUser} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                Save
              </button>
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;



import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';

export const getUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
};

export const addUser = async (userData) => {
    try {
      const response = await axios.post(API_URL, userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
};

export const updateUser = async (userId, userData) => {
    try {
      const response = await axios.put(`${API_URL}/${userId}`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw error;
    }
};
  
export const changeUserRole = async (userId, newRole) => {
    try {
      const response = await axios.patch(`${API_URL}/${userId}/role`, { role: newRole }, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error(`Error changing role for user with ID ${userId}:`, error);
      throw error;
    }
};

export const toggleUserStatus = async (userId, status) => {
    try {
      const response = await axios.patch(`${API_URL}/${userId}/status`, { status }, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error(`Error toggling status for user with ID ${userId}:`, error);
      throw error;
    }
};
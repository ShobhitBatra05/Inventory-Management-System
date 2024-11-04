import axios from 'axios';
const API_URL = 'http://localhost:8000/api/dashboard/';

export const getDashboardData = async () => {
    try {
      const response = await axios.get(API_URL); // Adjust this URL according to your backend
      return response.data; // Ensure this returns all the required KPIs
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error; // Re-throw the error to be handled in the calling function
    }
};
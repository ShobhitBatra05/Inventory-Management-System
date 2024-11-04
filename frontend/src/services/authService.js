import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/'; 

// Function to register a user
const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    }catch (error) {
        console.error('Error Registering User:', error);
        throw error;
    }
};


// Function to log in a user
const loginUser = async (userData) => {
try{
  const response = await axios.post(`${API_URL}login`, userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response.data)
  return response.data;
}catch (error) {
    console.error('Login Error:', error);
    throw error;
}
};

export { registerUser, loginUser };
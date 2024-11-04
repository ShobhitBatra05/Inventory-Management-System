import axios from 'axios';

const API_URL = 'http://localhost:8000/api/suppliers';

export const fetchSuppliers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
};


export const addSupplier = async (supplierData) => {
  console.log(supplierData)
    try {
      const response = await axios.post(API_URL, supplierData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding supplier:', error);
      throw error;
    }
};
  

export const updateSupplier = async (supplierId, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${supplierId}`, updatedData,  {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // return response.data;
      console.log('Supplier updated:', response.data);
    } catch (error) {
      console.error('Error updating supplier:', error);
      throw error;
    }
};


export const deleteSupplier = async (supplierId) => {
    try {
      await axios.delete(`${API_URL}/${supplierId}`);
    } catch (error) {
      console.error('Error deleting supplier:', error);
      throw error;
    }
  };

  export const topSuppliers = async () => {
    try {
      const response = await axios.get(`${API_URL}/top`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fetching top suppliers:', error);
      throw error;
    }
  };
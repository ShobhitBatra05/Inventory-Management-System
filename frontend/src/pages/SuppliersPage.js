import React, { useEffect, useState } from 'react';
import { fetchSuppliers, addSupplier, updateSupplier, deleteSupplier } from '../services/supplierService';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [formData, setFormData] = useState({ name: '', contactInfo: '', products: '' });

  useEffect(() => {
    // Use service to fetch Suppliers
    const loadSuppliers = async () => {
      const data = await fetchSuppliers();
      setSuppliers(data);
    };
    loadSuppliers();
  }, []);

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    setFormData({ name: '', contactInfo: '', products: '' });
    setShowModal(true);
  };

  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setFormData({ name: supplier.name, contactInfo: supplier.contactInfo, products: supplier.products });
    setShowModal(true);
  };

  const handleDeleteSupplier = async (supplierId) => {
    await deleteSupplier(supplierId);
    setSuppliers(suppliers.filter((supplier) => supplier._id !== supplierId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSupplier) {
      await updateSupplier(selectedSupplier._id, formData);
    } else {
      await addSupplier(formData);
    }
    const data = await fetchSuppliers();
    setSuppliers(data);
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  return (
      <div>
      <div className='flex justify-between items-center mb-6'>

        <h2 className="text-2xl font-bold">Suppliers</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddSupplier}
        >
          <MdAdd className='inline-block'/> Add Supplier
        </button>
      </div>
      
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">Supplier Name</th>
            <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">Contact Info</th>
            <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">Products</th>
            <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td className="py-2 px-4">{supplier.name}</td>
              <td className="py-2 px-4">{supplier.contactInfo}</td>
              <td className="py-2 px-4">{supplier.products.length}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleEditSupplier(supplier)}
                >
                  Edit <FaEdit className='inline-block'/>
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" 
                onClick={() => handleDeleteSupplier(supplier._id)}>
                  Delete <MdDelete className='inline-block' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Modal for Add/Edit Supplier */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">{selectedSupplier ? 'Edit Supplier' : 'Add Supplier'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Supplier Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded w-full px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Contact Info</label>
                <input
                  type="text"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  className="border rounded w-full px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Products</label>
                <input
                  type="text"
                  name="products"
                  value={formData.products}
                  onChange={handleChange}
                  className="border rounded w-full px-3 py-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {selectedSupplier ? 'Update Supplier' : 'Add Supplier'}
              </button>
              <button
                type="button"
                className="ml-2 bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;


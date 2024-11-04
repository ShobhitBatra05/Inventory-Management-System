import React, { useEffect, useState } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../services/productService'; 
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Use service to fetch products
    const loadProducts = async () => {
      const data = await fetchProducts(); 
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId) => {
     // Use service to delete product
    await deleteProduct(productId);
    setProducts(products.filter((product) => product._id !== productId));
  };

   // Add product submission logic
   const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: e.target.name.value,
      sku: e.target.sku.value,
      price: e.target.price.value,
      quantity: e.target.quantity.value,
      stock: e.target.stock.value,
    };

    if (selectedProduct) {
      await updateProduct(selectedProduct._id, productData);
    } else {
      await addProduct(productData);
    }
    // Refresh the product list after adding or updating
    const data = await fetchProducts();
    setProducts(data);
    setShowModal(false);
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>

        <h2 className="text-2xl font-bold">Products</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddProduct}
        >
          <MdAdd className='inline-block'/> Add Product
        </button>
      </div>
      
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">Product Name</th>
            <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">SKU</th>
            <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">Price per packet</th>
            <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">Seeds per Packet</th>
            <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">Stock (No. of packets)</th>
            <th className="py-2 px-4 bg-gray-200 text-left text-xs font-bold uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.sku}</td>
              <td className="py-2 px-4">Rs {product.price}</td>
              <td className="py-2 px-4">{product.quantity}</td>
              <td className="py-2 px-4">{product.stock}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit <FaEdit className='inline-block'/>
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" 
                onClick={() => handleDeleteProduct(product._id)}>
                  Delete <MdDelete className='inline-block' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Modal for Add/Edit Product */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">{selectedProduct ? 'Edit Product' : 'Add Product'}</h3>
            {/* Add/Edit Form */}
            {/* This can be a separate component */}
            <form onSubmit={handleSubmit}>
              {/* Include fields like name, SKU, price, stock, etc. */}
              <div className="mb-4">
                <label className="block mb-1">Product Name</label>
                <input
                  name="name"
                  type="text"
                  className="border rounded w-full px-3 py-2"
                  defaultValue={selectedProduct ? selectedProduct.name : ''}
                  required
                />

              </div>
              <div className="mb-4">
                <label className="block mb-1">SKU</label>
                <input
                  name="sku"
                  type="text"
                  className="border rounded w-full px-3 py-2"
                  defaultValue={selectedProduct ? selectedProduct.sku : ''}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Price Per Packet</label>
                <input
                  name="price"
                  type="number"
                  className="border rounded w-full px-3 py-2"
                  defaultValue={selectedProduct ? selectedProduct.price : ''}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Seeds Per Packet</label>
                <input
                  name="quantity"
                  type="number"
                  className="border rounded w-full px-3 py-2"
                  defaultValue={selectedProduct ? selectedProduct.quantity : ''}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Stock</label>
                <input
                  name="stock"
                  type="number"
                  className="border rounded w-full px-3 py-2"
                  defaultValue={selectedProduct ? selectedProduct.stock : ''}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {selectedProduct ? 'Update Product' : 'Add Product'}
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

export default Products;


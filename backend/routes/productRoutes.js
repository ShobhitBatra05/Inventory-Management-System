const express = require('express');
const { addProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

// Create a new product
router.post('/', addProduct);

// Get all products
router.get('/', getAllProducts);

// Update a product
router.put('/:id', updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

module.exports = router;
const express = require('express');
const { addSupplier, getAllSuppliers, updateSupplier, deleteSupplier, topSuppliers } = require('../controllers/supplierController');

const router = express.Router();

// Create a new supplier
router.post('/', addSupplier);

// Get all suppliers
router.get('/', getAllSuppliers);

// Update a supplier
router.put('/:id', updateSupplier);

// Delete a supplier
router.delete('/:id', deleteSupplier);

router.get('/top', topSuppliers);


module.exports = router;
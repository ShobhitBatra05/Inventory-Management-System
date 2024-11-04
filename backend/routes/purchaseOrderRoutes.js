const express = require('express');
const { createPurchaseOrder, getAllPurchaseOrders, updatePurchaseOrderStatus, deletePurchaseOrder } = require('../controllers/purchaseOrderController');

const router = express.Router();

// Create a new purchase order
router.post('/', createPurchaseOrder);

// Get all purchase orders
router.get('/', getAllPurchaseOrders);

// Update purchase order status
router.put('/:id/status', updatePurchaseOrderStatus);

// Delete a purchase order
router.delete('/:id', deletePurchaseOrder);

module.exports = router;

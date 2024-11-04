// routes/invoiceRoutes.js
const express = require('express');
const { createInvoice, getAllInvoices, updateInvoiceStatus, deleteInvoice } = require('../controllers/invoiceController');

const router = express.Router();

// Create a new invoice
router.post('/', createInvoice);

// Get all invoices
router.get('/', getAllInvoices);

// Update invoice status
router.put('/:id/status', updateInvoiceStatus);

// Delete an invoice
router.delete('/:id', deleteInvoice);

module.exports = router;

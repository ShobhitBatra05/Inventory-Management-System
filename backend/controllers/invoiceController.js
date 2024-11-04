// controllers/invoiceController.js
const Invoice = require('../models/Invoice');
const PurchaseOrder = require('../models/PurchaseOrder');

// Create a new invoice
exports.createInvoice = async (req, res) => {
    const { purchaseOrder } = req.body;

    try {
        const purchaseOrderExists = await PurchaseOrder.findById(purchaseOrder);
        if (!purchaseOrderExists) {
            return res.status(404).json({ error: 'Purchase Order not found' });
        }

        const newInvoice = new Invoice({
            purchaseOrder,
            totalAmount: purchaseOrderExists.totalAmount, // Use total from purchase order
        });
        await newInvoice.save();

        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(500).json({ error: 'Error creating invoice' });
    }
};

// Get all invoices
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('purchaseOrder');
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching invoices' });
    }
};

// Update invoice status
exports.updateInvoiceStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(id, { status }, { new: true });
        res.json(updatedInvoice);
    } catch (error) {
        res.status(500).json({ error: 'Error updating invoice status' });
    }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
    const { id } = req.params;

    try {
        await Invoice.findByIdAndDelete(id);
        res.json({ message: 'Invoice deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting invoice' });
    }
};

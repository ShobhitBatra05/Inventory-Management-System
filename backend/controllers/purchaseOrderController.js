// controllers/purchaseOrderController.js
const PurchaseOrder = require('../models/PurchaseOrder');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

// Create a new purchase order
exports.createPurchaseOrder = async (req, res) => {
    const { supplier, products } = req.body;

    try {
        const supplierExists = await Supplier.findById(supplier);
        if (!supplierExists) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        // Check if all products exist in the inventory
        const productIds = products.map(item => item.product);
        const existingProducts = await Product.find({ _id: { $in: productIds } });

        if (existingProducts.length !== productIds.length) {
            return res.status(404).json({ error: 'One or more products not found in inventory' });
        }

        // Calculate total amount based on existing products
        const totalAmount = products.reduce((sum, item) => {
            const product = existingProducts.find(p => p._id.toString() === item.product);
            return sum + (item.quantity * product.price);
        }, 0);

        const newPurchaseOrder = new PurchaseOrder({ supplier, products, totalAmount });
        await newPurchaseOrder.save();

        res.status(201).json(newPurchaseOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error creating purchase order' });
    }
};


// Get all purchase orders
exports.getAllPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.find().populate('supplier').populate('products.product');
        res.json(purchaseOrders);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching purchase orders' });
    }
};

// Update a purchase order status
exports.updatePurchaseOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await PurchaseOrder.findByIdAndUpdate(id, { status }, { new: true });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error updating purchase order status' });
    }
};

// Delete a purchase order
exports.deletePurchaseOrder = async (req, res) => {
    const { id } = req.params;

    try {
        await PurchaseOrder.findByIdAndDelete(id);
        res.json({ message: 'Purchase order deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting purchase order' });
    }
};

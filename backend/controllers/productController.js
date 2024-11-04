const Product = require('../models/Product');

// Create a new product
exports.addProduct = async (req, res) => {
    const { name, sku, price,quantity, stock } = req.body;

    try {
        const newProduct = new Product({ name, sku, price,quantity, stock });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, sku, price, quantity, stock } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, sku, price,quantity, stock }, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
};
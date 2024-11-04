const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

exports.addSupplier = async (req, res) => {
    const { name, contactInfo, products } = req.body;
    console.log(req.body)

    try {
        // Check if all product IDs are valid
        // const existingProducts = await Product.find({ _id: { $in: products } });

        // if (existingProducts.length !== products.length) {
        //     return res.status(400).json({ message: 'Some product IDs are invalid' });
        // }

        // Create the supplier
        const supplier = new Supplier({
            name,
            contactInfo,
            products
        });

        await supplier.save();
        res.status(201).json(supplier);
    } catch (error) {
        res.status(500).json({ error: 'Error creating supplier', message: error.message });
    }
};


// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find().populate('products');;
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching suppliers' });
    }
};
// Update a supplier
exports.updateSupplier = async (req, res) => {
    const { id } = req.params;
    const { name, contactInfo, products } = req.body;
    console.log(req.body)

    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, { name, contactInfo, products }, { new: true });
        res.json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ error: 'Error updating supplier' });
    }
};

// Delete a supplier
exports.deleteSupplier = async (req, res) => {
    const { id } = req.params;

    try {
        await Supplier.findByIdAndDelete(id);
        res.json({ message: 'Supplier deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting supplier' });
    }
};


exports.topSuppliers= async (req, res) => {
    try {
      const topSuppliers = await Supplier.find().limit(3).populate('products'); // Assuming you populate products
      console.log(topSuppliers)
      res.json(topSuppliers);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
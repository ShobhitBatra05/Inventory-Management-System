const Product = require('../models/Product');
const Order = require('../models/PurchaseOrder');
const Supplier = require('../models/Supplier');

exports.getDashboardData = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalSuppliers = await Supplier.countDocuments();
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 40 } }); // Adjust stock threshold
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    
    const revenue = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } },
    ]);

    // const topSuppliers = await Supplier.find().limit(5); // Adjust as needed

    res.json({
      totalProducts,
      totalSuppliers,
      lowStockProducts,
      totalOrders,
      pendingOrders,
      revenue: revenue[0]?.totalRevenue || 0,
    //   topSuppliers,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Track order by orderId + phone
router.post("/", async (req, res) => {
  try {
    const { orderId, phone } = req.body;

    if (!orderId || !phone) {
      return res.status(400).json({
        success: false,
        message: "Order ID and phone are required",
      });
    }

    const orders = await Order.find().sort({ createdAt: -1 });

    const matchedOrder = orders.find((order) => {
      const customOrderId = `SC${new Date(order.createdAt).getTime()}`;
      return customOrderId === orderId && order.phone === phone;
    });

    if (!matchedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order: {
        orderId,
        customerName: matchedOrder.customerName,
        phone: matchedOrder.phone,
        productName: matchedOrder.productName,
        amount: matchedOrder.amount,
        paymentStatus: matchedOrder.paymentStatus,
        orderStatus: matchedOrder.orderStatus,
        createdAt: matchedOrder.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to track order",
      error: error.message,
    });
  }
});

module.exports = router;
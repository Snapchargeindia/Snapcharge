const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

/* ================= TRACK ORDER ================= */

router.post("/", async (req, res) => {
  try {
    const { orderId, phone } = req.body;

    if (!orderId || !phone) {
      return res.status(400).json({
        success: false,
        message: "Order ID and phone are required",
      });
    }

    const order = await Order.findOne({
      _id: orderId,
      phone: String(phone).trim(),
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order: {
        _id: order._id,
        customerName: order.customerName,
        phone: order.phone,
        productName: order.productName,
        productImage: order.productImage,
        variant: order.variant,
        quantity: order.quantity,
        amount: order.amount,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        courierName: order.courierName || "",
        awbCode: order.awbCode || "",
        trackingUrl: order.trackingUrl || "",
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });
  } catch (error) {
    console.log("TRACK ORDER ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Error tracking order",
      error: error.message,
    });
  }
});

module.exports = router;
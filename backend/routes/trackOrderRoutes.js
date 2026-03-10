const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.post("/", async (req, res) => {
  try {

    const { orderId, phone } = req.body;

    const order = await Order.findOne({
      _id: orderId,
      phone: phone,
    });

    if (!order) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error tracking order",
    });

  }
});

module.exports = router;
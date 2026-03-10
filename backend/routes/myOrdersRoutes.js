const express = require("express");
const Order = require("../models/Order");
const userAuthMiddleware = require("../middleware/userAuthMiddleware");

const router = express.Router();

// GET ALL MY ORDERS
router.get("/", userAuthMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log("MY ORDERS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

// GET SINGLE MY ORDER
router.get("/:id", userAuthMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("MY ORDER DETAIL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch order detail",
    });
  }
});

module.exports = router;
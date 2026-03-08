const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Order = require("../models/Order");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
router.post("/create-order", async (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      city,
      state,
      pincode,
      productName,
      productId,
      variant,
      quantity,
      amount,
    } = req.body;

    if (!customerName || !phone || !address || !productName || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const order = await Order.create({
      customerName,
      phone,
      address,
      city,
      state,
      pincode,
      productName,
      productId,
      variant,
      quantity: quantity || 1,
      amount,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "created",
    });

    res.status(201).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      razorpayOrderId: razorpayOrder.id,
      dbOrderId: order._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create payment order",
      error: error.message,
    });
  }
});

// Verify payment
router.post("/verify-payment", async (req, res) => {
  try {
    const {
      dbOrderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      dbOrderId,
      {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paymentStatus: "paid",
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Verification failed",
      error: error.message,
    });
  }
});

module.exports = router;
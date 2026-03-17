const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const router = express.Router();

/* ================= AUTH HELPER ================= */
const getUserFromToken = (req) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

/* ================= CREATE ORDER ================= */
router.post("/create", async (req, res) => {
  try {
    const user = getUserFromToken(req);

    console.log("BODY DATA:", req.body); // 🔥 DEBUG

    const order = await Order.create({
      userId: user?._id || null,

      // ✅ FIXED FIELDS
      productName: req.body.productName || "No Name",
      productImage: req.body.productImage || "",

      amount: req.body.amount || 0,
      quantity: req.body.quantity || 1,
      variant: req.body.variant || "",

      customerName: req.body.customerName,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,

      paymentMethod: req.body.paymentMethod || "COD",
      orderStatus: "Placed",
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.log("ORDER CREATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
});

/* ================= GET MY ORDERS ================= */
router.get("/", async (req, res) => {
  try {
    const user = getUserFromToken(req);
    if (!user?._id)
      return res.status(401).json({ success: false });

    const orders = await Order.find({ userId: user._id }).sort({
      createdAt: -1,
    });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
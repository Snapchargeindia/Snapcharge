const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const router = express.Router();

/* ================= AUTH HELPER ================= */
const getUserFromToken = (req) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

/* ================= RAZORPAY INIT ================= */
const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  try {
    return new Razorpay({ key_id: keyId, key_secret: keySecret });
  } catch (error) {
    return null;
  }
};

/* ================= SHIPROCKET AUTH & SHIPMENT ================= */

// Token cache to avoid multiple logins
let shiprocketToken = null;

const createShiprocketShipment = async (order) => {
  try {
    console.log("SHIPROCKET PROCESS START FOR:", order._id);

    // 1. Login to get Token (Using Email/Pass as per your first screenshot)
    const loginRes = await axios.post("https://apiv2.shiprocket.in/v1/external/auth/login", {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    });

    const token = loginRes.data.token;
    if (!token) throw new Error("Token generation failed");

    // 2. Prepare Payload (Matching your Order Model)
    const payload = {
      order_id: order._id.toString(),
      order_date: new Date().toISOString(),
      pickup_location: "Primary", // DASHBOARD MEIN CHECK KAREIN YE NAAM SAHI HAI YA NAHI
      billing_customer_name: order.customerName,
      billing_last_name: "",
      billing_address: order.address,
      billing_city: order.city,
      billing_pincode: order.pincode,
      billing_state: order.state,
      billing_country: "India",
      billing_email: "support@snapchargee.in", 
      billing_phone: order.phone,
      shipping_is_billing: true,
      order_items: [
        {
          name: order.productName || "Product",
          sku: order.productId || "SKU-SNAP",
          units: order.quantity || 1,
          selling_price: order.amount,
        },
      ],
      payment_method: order.paymentMethod === "COD" ? "COD" : "Prepaid",
      sub_total: order.amount,
      length: 10, breadth: 10, height: 10, weight: 0.5,
    };

    // 3. Create Order in Shiprocket
    const orderRes = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const shipOrderId = orderRes.data.order_id;
    const shipmentId = orderRes.data.shipment_id;

    // 4. Update Database
    await Order.findByIdAndUpdate(order._id, {
      shiprocketOrderId: shipOrderId,
      orderStatus: "Confirmed",
    });

    console.log("SHIPROCKET SUCCESS:", shipOrderId);
    return orderRes.data;

  } catch (error) {
    console.error("SHIPROCKET ERROR:", error.response ? error.response.data : error.message);
    return null;
  }
};

/* ================= ROUTES ================= */

// 1. Create Online Order
router.post("/create-online-order", async (req, res) => {
  try {
    const razorpay = getRazorpayInstance();
    const user = getUserFromToken(req);
    const { customerName, phone, address, city, state, pincode, items, totalAmount } = req.body;

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    const order = await Order.create({
      userId: user?._id,
      customerName, phone, address, city, state, pincode,
      productName: items[0]?.productName,
      amount: totalAmount,
      razorpayOrderId: razorpayOrder.id,
      paymentMethod: "ONLINE",
      paymentStatus: "created",
    });

    res.status(201).json({ success: true, orderId: razorpayOrder.id, dbOrderId: order._id, key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Verify Payment & Sync to Shiprocket
router.post("/verify-payment", async (req, res) => {
  try {
    const { dbOrderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid Signature" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(dbOrderId, {
      paymentStatus: "paid",
      razorpayPaymentId: razorpay_payment_id,
      orderStatus: "Confirmed"
    }, { new: true });

    // SYNC TO SHIPROCKET
    await createShiprocketShipment(updatedOrder);

    res.status(200).json({ success: true, message: "Paid & Synced" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. COD Order
router.post("/create-cod-order", async (req, res) => {
  try {
    const user = getUserFromToken(req);
    const order = await Order.create({ ...req.body, userId: user?._id, paymentMethod: "COD" });

    // SYNC TO SHIPROCKET
    await createShiprocketShipment(order);

    res.status(201).json({ success: true, message: "COD Placed", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
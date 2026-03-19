const express = require("express");
const axios   = require("axios");
const crypto  = require("crypto");

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// CREDENTIALS
// ─────────────────────────────────────────────────────────────
const SR_API_KEY    = process.env.SHIPROCKET_API_KEY    || "zeYGVyDtCczihjDC";
const SR_SECRET_KEY = process.env.SHIPROCKET_SECRET_KEY || "PvcBuIxKLaaacHvmNEi34mFchjisYGn5";

const SR_CHECKOUT_BASE = "https://checkout-api.shiprocket.com";
const SR_SHIPPING_BASE = "https://apiv2.shiprocket.in/v1/external";

// ─────────────────────────────────────────────────────────────
// HMAC-SHA256 generator (required for all checkout API calls)
// ─────────────────────────────────────────────────────────────
const generateHMAC = (payload) => {
  const str = typeof payload === "string" ? payload : JSON.stringify(payload);
  return crypto
    .createHmac("sha256", SR_SECRET_KEY)
    .update(str)
    .digest("base64");
};

// ─────────────────────────────────────────────────────────────
// ROUTE 1 — POST /api/shiprocket/initiate
// Frontend calls this first to get an access token
// That token is passed to HeadlessCheckout.buyNow() on frontend
// ─────────────────────────────────────────────────────────────
router.post("/initiate", async (req, res) => {
  const payload = {
    address  : true,
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await axios.post(
      `${SR_CHECKOUT_BASE}/api/v1/access-token/login`,
      payload,
      {
        headers: {
          "Content-Type"      : "application/json",
          "X-Api-Key"         : SR_API_KEY,
          "X-Api-HMAC-SHA256" : generateHMAC(JSON.stringify(payload)),
        },
      }
    );

    console.log("✅ Shiprocket access token generated");
    res.json({
      success  : true,
      token    : response.data.result.token,
      expiresAt: response.data.result.expires_at,
    });
  } catch (err) {
    console.error("❌ Initiate error:", err.response?.data || err.message);
    res.status(500).json({
      error  : "Failed to get Shiprocket access token",
      details: err.response?.data,
    });
  }
});

// ─────────────────────────────────────────────────────────────
// ROUTE 2 — POST /api/shiprocket/customer-data
// Called after user completes OTP in HeadlessCheckout dialog
// Body: { token: "authorised_customer_token" }
// ─────────────────────────────────────────────────────────────
router.post("/customer-data", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  const payload = { token };

  try {
    const response = await axios.post(
      `${SR_CHECKOUT_BASE}/api/v1/customer-data/`,
      payload,
      {
        headers: {
          "Content-Type"      : "application/json",
          "X-Api-Key"         : SR_API_KEY,
          "X-Api-HMAC-SHA256" : generateHMAC(JSON.stringify(payload)),
        },
      }
    );

    console.log("✅ Customer data fetched");
    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error("❌ Customer data error:", err.response?.data || err.message);
    res.status(500).json({
      error  : "Failed to fetch customer data",
      details: err.response?.data,
    });
  }
});

// ─────────────────────────────────────────────────────────────
// ROUTE 3 — POST /api/shiprocket/create-order
// Called after address is selected on frontend
// Body: { cartItems, cartTotal, customer }
// ─────────────────────────────────────────────────────────────
let shippingToken = null;

const getShippingToken = async () => {
  if (shippingToken) return shippingToken;
  const res = await axios.post(`${SR_SHIPPING_BASE}/auth/login`, {
    email   : process.env.SHIPROCKET_EMAIL,
    password: process.env.SHIPROCKET_PASSWORD,
  });
  shippingToken = res.data.token;
  console.log("✅ Shipping token generated");
  return shippingToken;
};

router.post("/create-order", async (req, res) => {
  const { cartItems, cartTotal, customer } = req.body;

  if (!cartItems || !customer) {
    return res.status(400).json({ error: "cartItems and customer are required" });
  }

  try {
    const token = await getShippingToken();

    const orderPayload = {
      order_id              : `ORD-${Date.now()}`,
      order_date            : new Date().toISOString().split("T")[0],
      pickup_location       : "Primary",
      billing_customer_name : customer.name,
      billing_address       : customer.address,
      billing_city          : customer.city,
      billing_pincode       : customer.pincode,
      billing_state         : customer.state,
      billing_country       : "India",
      billing_email         : customer.email,
      billing_phone         : customer.phone,
      shipping_is_billing   : true,
      payment_method        : "Prepaid",
      sub_total             : cartTotal,
      length: 10, breadth: 10, height: 10, weight: 1,
      order_items: cartItems.map((item) => ({
        name          : item.name,
        sku           : item.id?.toString() || "SKU001",
        units         : item.quantity,
        selling_price : item.price,
      })),
    };

    const response = await axios.post(
      `${SR_SHIPPING_BASE}/orders/create/adhoc`,
      orderPayload,
      {
        headers: {
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Order created:", response.data.order_id);
    res.json({
      success    : true,
      orderId    : response.data.order_id,
      shipmentId : response.data.shipment_id,
      checkoutUrl: response.data.checkout_url || null,
      data       : response.data,
    });
  } catch (err) {
    console.error("❌ Create order error:", err.response?.data || err.message);
    if (err.response?.status === 401) shippingToken = null;
    res.status(500).json({
      error  : "Failed to create order",
      details: err.response?.data,
    });
  }
});

module.exports = router;
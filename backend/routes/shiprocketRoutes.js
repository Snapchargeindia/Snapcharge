// shiprocketRoutes.js
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");

const router = express.Router();

// ENV
const SR_API_KEY = process.env.SHIPROCKET_API_KEY;
const SR_SECRET_KEY = process.env.SHIPROCKET_SECRET_KEY;
const SR_CHECKOUT_BASE = "https://checkout-api.shiprocket.com";
const SR_SHIPPING_BASE = "https://apiv2.shiprocket.in/v1/external";

// HMAC
const generateHMAC = (payload) =>
  crypto.createHmac("sha256", SR_SECRET_KEY).update(payload).digest("base64");

// ROUTE 1 — INITIATE CHECKOUT
router.post("/initiate", async (req, res) => {
  try {
    const payload = JSON.stringify({
      address: true,
      timestamp: new Date().toISOString(),
    });

    const hmac = generateHMAC(payload);

    const response = await axios.post(
      `${SR_CHECKOUT_BASE}/api/v1/access-token/login`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": SR_API_KEY,
          "X-Api-HMAC-SHA256": hmac,
        },
      }
    );

    if (!response.data?.result?.token) {
      return res.status(400).json({
        success: false,
        message: "Token not received",
        data: response.data,
      });
    }

    return res.json({
      success: true,
      token: response.data.result.token,
      expiresAt: response.data.result.expires_at,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: "Shiprocket initiate failed",
      error: err.response?.data || err.message,
    });
  }
});

// ROUTE 2 — CREATE ORDER
let shippingToken = null;

const getShippingToken = async () => {
  try {
    if (shippingToken) return shippingToken;

    const res = await axios.post(`${SR_SHIPPING_BASE}/auth/login`, {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    });

    shippingToken = res.data.token;
    return shippingToken;
  } catch (err) {
    console.error("Shipping Auth Error:", err.response?.data || err.message);
    throw err;
  }
};

router.post("/create-order", async (req, res) => {
  const { cartItems, cartTotal, customer } = req.body;

  try {
    const token = await getShippingToken();

    const orderPayload = {
      order_id: `ORD-${Date.now()}`,
      order_date: new Date().toISOString().split("T")[0],
      pickup_location: "Primary",

      billing_customer_name: customer.name,
      billing_address: customer.address,
      billing_city: customer.city,
      billing_pincode: customer.pincode,
      billing_state: customer.state,
      billing_country: "India",
      billing_email: customer.email,
      billing_phone: customer.phone,

      shipping_is_billing: true,
      payment_method: "Prepaid",
      sub_total: cartTotal,

      length: 10,
      breadth: 10,
      height: 10,
      weight: 1,

      order_items: cartItems.map((item) => ({
        name: item.name,
        sku: item.id?.toString() || "SKU001",
        units: item.quantity,
        selling_price: item.price,
      })),
    };

    const response = await axios.post(
      `${SR_SHIPPING_BASE}/orders/create/adhoc`,
      orderPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.json({
      success: true,
      orderId: response.data.order_id,
      data: response.data,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    if (err.response?.status === 401) shippingToken = null;

    return res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: err.response?.data || err.message,
    });
  }
});

module.exports = router;
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/create-checkout", async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, error: "Cart is empty" });
    }

    const orderItems = cartItems.map((item) => ({
      name: item.name || "Test Product",
      sku: item._id || "test_sku",
      units: Number(item.quantity || 1),
      selling_price: Number(item.price || 1),
    }));

    const payload = {
      public_key: process.env.SHIPROCKET_PUBLIC_KEY,
      order: {
        order_id: "ORD_" + Date.now(),
        order_date: new Date(),
        order_items: orderItems,
        customer_details: {
          name: "Test User",
          email: "test@test.com",
          phone: "9999999999",
        },
      },
    };

    console.log("➡️ Payload sent:", payload);

    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/checkout/create-order",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.SHIPROCKET_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Shiprocket response:", response.data);

    res.json({
      success: true,
      checkout_url: response.data.checkout_url,
    });
  } catch (err) {
    console.log("❌ SHIPROCKET ERROR:", err.response?.data || err.message);
    res.status(500).json({
      success: false,
      error: err.response?.data || err.message,
    });
  }
});

module.exports = router;
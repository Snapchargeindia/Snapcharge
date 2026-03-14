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

/* ================= SHIPROCKET TOKEN CACHE ================= */

let shiprocketToken = null;
let shiprocketTokenCreatedAt = null;
let shiprocketBlockedUntil = null;

const getShiprocketToken = async () => {
  try {
    if (shiprocketBlockedUntil && Date.now() < shiprocketBlockedUntil) {
      console.log("SHIPROCKET LOGIN SKIPPED - TEMP BLOCK ACTIVE");
      return null;
    }

    if (
      shiprocketToken &&
      shiprocketTokenCreatedAt &&
      Date.now() - shiprocketTokenCreatedAt < 8 * 60 * 1000
    ) {
      return shiprocketToken;
    }

    const res = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }
    );

    shiprocketToken = res.data.token;
    shiprocketTokenCreatedAt = Date.now();
    shiprocketBlockedUntil = null;

    console.log("SHIPROCKET TOKEN GENERATED");
    return shiprocketToken;
  } catch (error) {
    const status = error.response?.status;
    const data = error.response?.data;

    console.log("SHIPROCKET LOGIN ERROR:", data || error.message);

    if (
      status === 403 ||
      String(data?.message || "").toLowerCase().includes("blocked")
    ) {
      shiprocketBlockedUntil = Date.now() + 2 * 60 * 60 * 1000;
      console.log("SHIPROCKET TEMP BLOCK STORED FOR 2 HOURS");
    }

    return null;
  }
};

/* ================= CREATE SHIPMENT ================= */

const createShipment = async (order) => {
  try {
    const token = await getShiprocketToken();

    if (!token) {
      console.log("Shiprocket token missing");
      return null;
    }

    const shipmentRes = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      {
        order_id: order._id.toString(),
        order_date: new Date().toISOString().slice(0, 10),
        pickup_location: "Primary",
        billing_customer_name: order.customerName,
        billing_last_name: "",
        billing_phone: order.phone,
        billing_address: order.address,
        billing_address_2: "",
        billing_city: order.city,
        billing_pincode: order.pincode,
        billing_state: order.state,
        billing_country: "India",
        billing_email: "support@snapchargee.in",
        shipping_is_billing: true,

        order_items: [
          {
            name: order.productName,
            sku: order.productId || "sku1",
            units: order.quantity || 1,
            selling_price: order.amount,
          },
        ],

        payment_method: order.paymentMethod === "COD" ? "COD" : "Prepaid",
        sub_total: order.amount,
        length: 10,
        breadth: 10,
        height: 10,
        weight: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SHIPMENT CREATED:", shipmentRes.data);

    const shiprocketOrderId = shipmentRes.data?.order_id || "";
    const shipmentId = shipmentRes.data?.shipment_id || "";

    let awbCode = "";
    let courierName = "";
    let trackingUrl = "";

    if (shipmentId) {
      try {
        const awbRes = await axios.post(
          "https://apiv2.shiprocket.in/v1/external/courier/assign/awb",
          {
            shipment_id: shipmentId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("SHIPROCKET AWB RESPONSE:", awbRes.data);

        awbCode = awbRes.data?.response?.data?.awb_code || "";
        courierName = awbRes.data?.response?.data?.courier_name || "";
      } catch (error) {
        console.log(
          "SHIPROCKET AWB ERROR:",
          error.response?.data || error.message
        );
      }
    }

    if (awbCode) {
      try {
        const trackRes = await axios.get(
          `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awbCode}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("SHIPROCKET TRACK RESPONSE:", trackRes.data);

        trackingUrl = trackRes.data?.tracking_data?.track_url || "";
      } catch (error) {
        console.log(
          "SHIPROCKET TRACK ERROR:",
          error.response?.data || error.message
        );
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      order._id,
      {
        shiprocketOrderId,
        awbCode,
        courierName,
        trackingUrl,
      },
      { new: true }
    );

    return updatedOrder;
  } catch (error) {
    console.log("SHIPMENT ERROR:", error.response?.data || error.message);
    return null;
  }
};

/* ================= CREATE ORDER ================= */

router.post("/create", async (req, res) => {
  try {
    const user = getUserFromToken(req);

    const order = await Order.create({
      ...req.body,
      userId: user?._id || null,
    });

    createShipment(order);

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("ORDER CREATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: error.message,
    });
  }
});

/* ================= GET MY ORDERS ================= */

router.get("/", async (req, res) => {
  try {
    const user = getUserFromToken(req);

    if (!user?._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const orders = await Order.find({ userId: user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log("GET ORDERS ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

/* ================= GET SINGLE ORDER ================= */

router.get("/:id", async (req, res) => {
  try {
    const user = getUserFromToken(req);

    if (!user?._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      userId: user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("GET SINGLE ORDER ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
});

module.exports = router;
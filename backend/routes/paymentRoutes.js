const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const router = express.Router();

/* ================= DEBUG ================= */

console.log("PAYMENT ROUTES ORDER MODEL CHECK:", {
  type: typeof Order,
  hasCreate: typeof Order?.create,
  modelName: Order?.modelName,
});

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

/* ================= SAFE RAZORPAY INIT ================= */

const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.log("RAZORPAY CONFIG MISSING:", {
      razorpayKeyIdPresent: !!keyId,
      razorpayKeySecretPresent: !!keySecret,
    });
    return null;
  }

  try {
    return new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  } catch (error) {
    console.log("RAZORPAY INIT ERROR:", error.message);
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
      console.log("SHIPROCKET USING CACHED TOKEN");
      return shiprocketToken;
    }

    if (
      !process.env.SHIPROCKET_API_KEY ||
      !process.env.SHIPROCKET_SECRET_KEY
    ) {
      console.log("SHIPROCKET API CONFIG MISSING", {
        apiKeyPresent: !!process.env.SHIPROCKET_API_KEY,
        secretKeyPresent: !!process.env.SHIPROCKET_SECRET_KEY,
      });
      return null;
    }

    console.log("SHIPROCKET API LOGIN ATTEMPT", {
      apiKeyPresent: !!process.env.SHIPROCKET_API_KEY,
      secretKeyPresent: !!process.env.SHIPROCKET_SECRET_KEY,
    });

    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        api_key: process.env.SHIPROCKET_API_KEY,
        api_secret: process.env.SHIPROCKET_SECRET_KEY,
      }
    );

    shiprocketToken = response.data?.token || null;
    shiprocketTokenCreatedAt = Date.now();
    shiprocketBlockedUntil = null;

    console.log("SHIPROCKET LOGIN SUCCESS");
    return shiprocketToken;
  } catch (error) {
    const status = error.response?.status;
    const data = error.response?.data;

    console.log("SHIPROCKET LOGIN ERROR FULL:", status, data || error.message);

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

/* ================= SHIPROCKET SHIPMENT ================= */

const createShiprocketShipment = async (order) => {
  try {
    console.log("CREATE SHIPROCKET SHIPMENT START:", {
      orderId: order?._id,
      customerName: order?.customerName,
      phone: order?.phone,
      city: order?.city,
      state: order?.state,
      pincode: order?.pincode,
      amount: order?.amount,
      paymentMethod: order?.paymentMethod,
    });

    const token = await getShiprocketToken();

    console.log("SHIPROCKET TOKEN RESULT:", !!token);

    if (!token) {
      console.log("SHIPROCKET TOKEN NOT GENERATED");
      return null;
    }

    const payload = {
      order_id: order._id.toString(),
      order_date: new Date().toISOString().slice(0, 10),
      pickup_location: "Primary",
      channel_id: "",
      comment: "Order created from Snapcharge website",

      billing_customer_name: order.customerName,
      billing_last_name: "",
      billing_address: order.address,
      billing_address_2: "",
      billing_city: order.city,
      billing_pincode: order.pincode,
      billing_state: order.state,
      billing_country: "India",
      billing_email: "support@snapchargee.in",
      billing_phone: order.phone,

      shipping_is_billing: true,
      shipping_customer_name: "",
      shipping_last_name: "",
      shipping_address: "",
      shipping_address_2: "",
      shipping_city: "",
      shipping_pincode: "",
      shipping_country: "",
      shipping_state: "",
      shipping_email: "",
      shipping_phone: "",

      order_items: [
        {
          name: order.productName,
          sku: order.productId || "SKU001",
          units: order.quantity || 1,
          selling_price: String(order.amount),
          discount: "",
          tax: "",
          hsn: "",
        },
      ],

      payment_method: order.paymentMethod === "COD" ? "COD" : "Prepaid",
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: Number(order.amount),
      length: 10,
      breadth: 10,
      height: 10,
      weight: 0.5,
    };

    console.log("SHIPROCKET PAYLOAD:", JSON.stringify(payload));

    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SHIPROCKET ORDER CREATE RESPONSE:", response.data);

    const shiprocketOrderId = response.data?.order_id || "";
    const shipmentId = response.data?.shipment_id || "";

    let awbCode = "";
    let courierName = "";
    let trackingUrl = "";

    if (shipmentId) {
      try {
        const awbResponse = await axios.post(
          "https://apiv2.shiprocket.in/v1/external/courier/assign/awb",
          { shipment_id: shipmentId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("SHIPROCKET AWB RESPONSE:", awbResponse.data);

        awbCode = awbResponse.data?.response?.data?.awb_code || "";
        courierName = awbResponse.data?.response?.data?.courier_name || "";
      } catch (awbError) {
        console.log(
          "SHIPROCKET AWB ERROR FULL:",
          awbError.response?.status,
          awbError.response?.data || awbError.message
        );
      }
    }

    if (awbCode) {
      try {
        const trackResponse = await axios.get(
          `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awbCode}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("SHIPROCKET TRACK RESPONSE:", trackResponse.data);

        trackingUrl = trackResponse.data?.tracking_data?.track_url || "";
      } catch (trackError) {
        console.log(
          "SHIPROCKET TRACK ERROR FULL:",
          trackError.response?.status,
          trackError.response?.data || trackError.message
        );
      }
    }

    await Order.findByIdAndUpdate(order._id, {
      shiprocketOrderId,
      awbCode,
      courierName,
      trackingUrl,
      orderStatus: "Confirmed",
    });

    return {
      shiprocketOrderId,
      shipmentId,
      awbCode,
      courierName,
      trackingUrl,
    };
  } catch (error) {
    console.log(
      "SHIPROCKET CREATE SHIPMENT ERROR FULL:",
      error.response?.status,
      error.response?.data || error.message
    );
    return null;
  }
};

/* ================= DEBUG ROUTES ================= */

router.get("/debug-check", (req, res) => {
  return res.json({
    success: true,
    razorpayKeyIdPresent: !!process.env.RAZORPAY_KEY_ID,
    razorpayKeySecretPresent: !!process.env.RAZORPAY_KEY_SECRET,
    mongoUriPresent: !!process.env.MONGO_URI,
    jwtSecretPresent: !!process.env.JWT_SECRET,
    shiprocketApiKeyPresent: !!process.env.SHIPROCKET_API_KEY,
    shiprocketSecretKeyPresent: !!process.env.SHIPROCKET_SECRET_KEY,
  });
});

router.get("/test-shiprocket", async (req, res) => {
  try {
    const token = await getShiprocketToken();

    return res.json({
      success: true,
      tokenGenerated: !!token,
      shiprocketApiKeyPresent: !!process.env.SHIPROCKET_API_KEY,
      shiprocketSecretKeyPresent: !!process.env.SHIPROCKET_SECRET_KEY,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ================= VALIDATION FUNCTIONS ================= */

const isValidIndianPhone = (phone) => {
  return /^[6-9]\d{9}$/.test(String(phone).trim());
};

const isValidPincode = (pincode) => {
  return /^\d{6}$/.test(String(pincode).trim());
};

/* ================= ONLINE PAYMENT ORDER ================= */

router.post("/create-online-order", async (req, res) => {
  try {
    console.log("ONLINE CREATE ORDER BODY:", req.body);

    const razorpay = getRazorpayInstance();

    if (!razorpay) {
      return res.status(500).json({
        success: false,
        message: "Razorpay is not configured properly",
      });
    }

    const user = getUserFromToken(req);

    const {
      customerName,
      phone,
      address,
      city,
      state,
      pincode,
      items,
      totalAmount,
    } = req.body;

    if (
      !customerName ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !Array.isArray(items) ||
      !items.length ||
      !totalAmount
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields for online order",
      });
    }

    if (!isValidIndianPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Only valid Indian phone numbers are allowed",
      });
    }

    if (!isValidPincode(pincode)) {
      return res.status(400).json({
        success: false,
        message: "We currently deliver only within India (invalid pincode)",
      });
    }

    const finalAmount = Math.round(Number(totalAmount) * 100);

    if (!finalAmount || Number.isNaN(finalAmount) || finalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount",
      });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: finalAmount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    const firstItem = items[0] || {};

    const order = await Order.create({
      userId: user?._id || null,
      customerName,
      phone,
      address,
      city,
      state,
      pincode,
      productName: firstItem.productName || "Cart Order",
      productId: firstItem.productId || "",
      productImage: firstItem.productImage || "",
      variant: firstItem.variant || "Default",
      quantity: Number(firstItem.quantity || 1),
      amount: Number(totalAmount),
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "created",
      paymentMethod: "ONLINE",
      orderStatus: "Pending",
    });

    return res.status(201).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderId: razorpayOrder.id,
      razorpayOrderId: razorpayOrder.id,
      dbOrderId: order._id,
    });
  } catch (error) {
    console.log("ONLINE ORDER CREATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create payment order",
      error: error.message,
    });
  }
});

/* old compatibility route */
router.post("/create-order", async (req, res) => {
  try {
    console.log("ONLINE CREATE ORDER BODY (OLD ROUTE):", req.body);

    const razorpay = getRazorpayInstance();

    if (!razorpay) {
      return res.status(500).json({
        success: false,
        message: "Razorpay is not configured properly",
      });
    }

    const user = getUserFromToken(req);

    const {
      customerName,
      phone,
      address,
      city,
      state,
      pincode,
      productName,
      productId,
      productImage,
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

    if (!isValidIndianPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Only valid Indian phone numbers are allowed",
      });
    }

    if (!isValidPincode(pincode)) {
      return res.status(400).json({
        success: false,
        message: "We currently deliver only within India (invalid pincode)",
      });
    }

    const finalAmount = Math.round(Number(amount) * 100);

    if (!finalAmount || Number.isNaN(finalAmount) || finalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount",
      });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: finalAmount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    const order = await Order.create({
      userId: user?._id || null,
      customerName,
      phone,
      address,
      city,
      state,
      pincode,
      productName,
      productId,
      productImage: productImage || "",
      variant,
      quantity: quantity || 1,
      amount,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "created",
      paymentMethod: "ONLINE",
      orderStatus: "Pending",
    });

    return res.status(201).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderId: razorpayOrder.id,
      razorpayOrderId: razorpayOrder.id,
      dbOrderId: order._id,
    });
  } catch (error) {
    console.log("ONLINE ORDER CREATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create payment order",
      error: error.message,
    });
  }
});

/* ================= COD ORDER ================= */

router.post("/create-cod-order", async (req, res) => {
  try {
    console.log("COD ROUTE HIT ON LIVE");
    console.log("COD BODY:", req.body);

    const user = getUserFromToken(req);

    const {
      customerName,
      phone,
      address,
      city,
      state,
      pincode,
      productName,
      productId,
      productImage,
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

    if (!isValidIndianPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Only Indian phone numbers allowed",
      });
    }

    if (!isValidPincode(pincode)) {
      return res.status(400).json({
        success: false,
        message: "We deliver only within India",
      });
    }

    const order = await Order.create({
      userId: user?._id || null,
      customerName,
      phone,
      address,
      city,
      state,
      pincode,
      productName,
      productId,
      productImage: productImage || "",
      variant,
      quantity: quantity || 1,
      amount,
      paymentStatus: "created",
      paymentMethod: "COD",
      orderStatus: "Pending",
    });

    console.log("COD ORDER CREATED:", order._id);
    console.log("ABOUT TO CALL SHIPROCKET FOR ORDER:", order._id);

    try {
      const shiprocketResult = await createShiprocketShipment(order);
      console.log("FINAL SHIPROCKET RESULT:", shiprocketResult);
    } catch (shipError) {
      console.log("COD SHIPROCKET ERROR:", shipError.message);
    }

    return res.status(201).json({
      success: true,
      message: "COD order placed successfully",
      order,
    });
  } catch (error) {
    console.log("COD BACKEND ERROR FULL:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create COD order",
      error: error.message,
    });
  }
});

/* ================= VERIFY PAYMENT ================= */

router.post("/verify-payment", async (req, res) => {
  try {
    const {
      dbOrderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !dbOrderId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification fields",
      });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Razorpay secret is missing",
      });
    }

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
        paymentMethod: "ONLINE",
        orderStatus: "Confirmed",
      },
      { new: true }
    );

    if (updatedOrder) {
      try {
        const shiprocketResult = await createShiprocketShipment(updatedOrder);
        console.log("ONLINE FINAL SHIPROCKET RESULT:", shiprocketResult);
      } catch (shipError) {
        console.log("ONLINE SHIPROCKET ERROR:", shipError.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.log("VERIFY PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Verification failed",
      error: error.message,
    });
  }
});

module.exports = router;
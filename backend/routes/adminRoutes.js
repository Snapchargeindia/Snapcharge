const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");

const router = express.Router();

const ALLOWED_STATUSES = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

/* ================================
   GET ALL ORDERS (ADMIN PANEL)
================================ */

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log("ADMIN GET ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

/* ================================
   GET SINGLE ORDER
================================ */

router.get("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("ADMIN GET SINGLE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
});

/* ================================
   UPDATE ORDER STATUS + ALL DATES
================================ */

router.put("/orders/:id/status", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      status,
      confirmedAt,
      packedAt,
      shippedAt,
      outForDeliveryAt,
      deliveredAt,
      expectedShipDate,
      expectedDeliveryDate,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }

    if (!status || !ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = status;

    if (confirmedAt) order.confirmedAt = new Date(confirmedAt);
    if (packedAt) order.packedAt = new Date(packedAt);
    if (shippedAt) order.shippedAt = new Date(shippedAt);
    if (outForDeliveryAt) order.outForDeliveryAt = new Date(outForDeliveryAt);
    if (deliveredAt) order.deliveredAt = new Date(deliveredAt);
    if (expectedShipDate) order.expectedShipDate = new Date(expectedShipDate);
    if (expectedDeliveryDate) {
      order.expectedDeliveryDate = new Date(expectedDeliveryDate);
    }

    // important fix
    if (!Array.isArray(order.trackingEvents)) {
      order.trackingEvents = [];
    }

    const pushTrackingEvent = (title, description, statusKey, dateValue) => {
      const alreadyExists = order.trackingEvents.some(
        (event) => event.statusKey === statusKey
      );

      if (!alreadyExists && dateValue) {
        order.trackingEvents.push({
          title,
          description,
          eventTime: new Date(dateValue),
          statusKey,
        });
      }
    };

    pushTrackingEvent(
      "Order Confirmed",
      "Your order has been confirmed by the seller.",
      "Confirmed",
      confirmedAt
    );

    pushTrackingEvent(
      "Order Packed",
      "Your item has been packed and is ready for shipment.",
      "Packed",
      packedAt
    );

    pushTrackingEvent(
      "Order Shipped",
      "Your shipment has been handed over to the courier.",
      "Shipped",
      shippedAt
    );

    pushTrackingEvent(
      "Out for Delivery",
      "Your order is out for delivery.",
      "Out for Delivery",
      outForDeliveryAt
    );

    pushTrackingEvent(
      "Order Delivered",
      "Your order has been delivered successfully.",
      "Delivered",
      deliveredAt
    );

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.log("ADMIN UPDATE ORDER STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
});

/* ================================
   DELETE ORDER
================================ */

router.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted",
    });
  } catch (error) {
    console.log("ADMIN DELETE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
});

module.exports = router;
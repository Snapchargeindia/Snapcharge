const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    pincode: { type: String, default: "" },

    productName: { type: String, required: true },
    productId: { type: String, default: "" },
    variant: { type: String, default: "" },
    quantity: { type: Number, default: 1 },
    amount: { type: Number, required: true },

    razorpayOrderId: { type: String, default: "" },
    razorpayPaymentId: { type: String, default: "" },
    razorpaySignature: { type: String, default: "" },

    paymentStatus: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },

    // 🔥 ORDER TRACKING STATUS
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Packed", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
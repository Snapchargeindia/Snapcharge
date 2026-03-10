import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("snapcharge_last_order");
    if (saved) {
      setOrder(JSON.parse(saved));
    }

    // 🔔 Notification
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("Order Placed 🎉", {
          body: "Your SnapCharge order was placed successfully.",
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAEBD7]">
        <p className="text-lg text-[#436056]">No order found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAEBD7] flex items-center justify-center pt-40 pb-20 px-4">
      <div className="bg-white max-w-xl w-full rounded-3xl shadow-lg p-8 text-center">

        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 w-16 h-16 flex items-center justify-center rounded-full text-3xl">
            ✅
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-[#436056] mb-2">
          Order Placed Successfully
        </h1>

        <p className="text-gray-500 mb-4">
          Thank you for shopping with SnapCharge
        </p>

        {/* ORDER INFO */}
        <div className="text-sm text-gray-600 space-y-1 mb-6">
          <p>
            <span className="font-semibold">Order ID:</span>{" "}
            {order.orderId}
          </p>

          <p>
            <span className="font-semibold">Payment Method:</span>{" "}
            {order.paymentMethod}
          </p>

          <p>
            <span className="font-semibold">Payment Status:</span>{" "}
            {order.paymentStatus}
          </p>
        </div>

        {/* PRODUCT */}
        <div className="border rounded-xl p-4 flex gap-4 items-center mb-6 bg-[#fafafa]">

          <img
            src={order.item.image}
            alt={order.item.name}
            className="w-16 h-16 object-contain"
          />

          <div className="text-left flex-1">
            <p className="font-semibold text-[#436056]">
              {order.item.name}
            </p>

            <p className="text-sm text-gray-500">
              Qty: {order.item.quantity || 1}
            </p>

            <p className="text-[#436056] font-bold">
              ₹{order.total}
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 justify-center">

          <button
            onClick={() => navigate("/")}
            className="bg-[#9DC183] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#436056] transition"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="border border-[#436056] text-[#436056] px-6 py-3 rounded-full font-semibold hover:bg-[#f5f5f5] transition"
          >
            View Cart
          </button>

        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
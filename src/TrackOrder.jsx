import React, { useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://api.snapchargee.in");

const STATUS_STEPS = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered"];

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!orderId.trim() || !phone.trim()) {
      alert("Please enter Order ID and Phone Number");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      alert("Please enter a valid Indian phone number");
      return;
    }

    try {
      setLoading(true);
      setOrder(null);

      const res = await fetch(`${API_URL}/api/track-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId.trim(),
          phone: phone.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setOrder(data.order);
      } else {
        alert(data.message || "Order not found");
        setOrder(null);
      }
    } catch (error) {
      console.log("TRACK ORDER ERROR:", error);
      alert("Something went wrong while tracking the order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-32 px-4 sm:px-6 pb-16">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-[#436056] mb-2">
          Track Your Order
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Enter your Order ID and phone number to check the latest status.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
          />
        </div>

        <button
          onClick={handleTrack}
          disabled={loading}
          className="w-full mt-4 bg-[#9DC183] text-white py-3 rounded-xl font-semibold hover:bg-[#436056] transition disabled:opacity-60"
        >
          {loading ? "Tracking..." : "Track Order"}
        </button>

        {order && (
          <div className="mt-8 border-t pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-28 h-28 rounded-2xl bg-[#f8f8f8] overflow-hidden flex items-center justify-center">
                {order.productImage ? (
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No Image</span>
                )}
              </div>

              <div className="flex-1">
                <p className="text-xl font-semibold text-[#436056]">
                  {order.productName}
                </p>

                {order.variant && (
                  <p className="text-sm text-gray-500 mt-1">
                    Variant: {order.variant}
                  </p>
                )}

                <p className="text-sm text-gray-600 mt-2">
                  Order ID: {order._id}
                </p>

                <p className="text-sm text-gray-600">
                  Qty: {order.quantity}
                </p>

                <p className="text-sm text-gray-600">
                  Amount: ₹{order.amount}
                </p>

                <p className="text-sm text-gray-600">
                  Payment: {order.paymentMethod}
                </p>

                <p className="text-sm text-gray-600">
                  Payment Status: {order.paymentStatus}
                </p>

                <p className="text-sm text-gray-600">
                  Ordered On: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-semibold text-[#436056] mb-3">Order Status</p>

              <div className="flex flex-wrap gap-2">
                {STATUS_STEPS.map((step) => (
                  <StatusStep
                    key={step}
                    label={step}
                    current={order.orderStatus}
                  />
                ))}
              </div>
            </div>

            {(order.courierName || order.awbCode || order.trackingUrl) && (
              <div className="mt-6 bg-[#f8fbf5] border border-[#dfead6] rounded-2xl p-4">
                <p className="font-semibold text-[#436056] mb-3">
                  Shipping Details
                </p>

                {order.courierName && (
                  <p className="text-sm text-gray-700 mb-1">
                    Courier: {order.courierName}
                  </p>
                )}

                {order.awbCode && (
                  <p className="text-sm text-gray-700 mb-1">
                    AWB: {order.awbCode}
                  </p>
                )}

                {order.trackingUrl && (
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-sm font-semibold text-[#436056] underline"
                  >
                    Track Shipment
                  </a>
                )}
              </div>
            )}

            <div className="mt-6 bg-[#fafafa] rounded-2xl p-4 border">
              <p className="font-semibold text-[#436056] mb-2">
                Delivery Address
              </p>
              <p className="text-sm text-gray-700">{order.customerName}</p>
              <p className="text-sm text-gray-700">{order.phone}</p>
              <p className="text-sm text-gray-700">{order.address}</p>
              <p className="text-sm text-gray-700">
                {order.city}, {order.state} - {order.pincode}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatusStep = ({ label, current }) => {
  const active = STATUS_STEPS.indexOf(current) >= STATUS_STEPS.indexOf(label);

  return (
    <div
      className={`px-4 py-2 rounded-full text-xs font-semibold ${
        active ? "bg-[#9DC183] text-white" : "bg-gray-200 text-gray-600"
      }`}
    >
      {label}
    </div>
  );
};

export default TrackOrder;
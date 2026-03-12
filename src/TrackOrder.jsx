import React, { useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://api.snapchargee.in");
    
const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!orderId || !phone) {
      alert("Please enter Order ID and Phone Number");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/track-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          phone,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        alert("Order not found");
        setOrder(null);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-32 px-6 pb-16">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow p-8">

        <h1 className="text-3xl font-bold text-[#436056] mb-6">
          Track Your Order
        </h1>

        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
        />

        <button
          onClick={handleTrack}
          className="w-full bg-[#9DC183] text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Tracking..." : "Track Order"}
        </button>

        {order && (
          <div className="mt-8 border-t pt-6">

            <p className="text-lg font-semibold text-[#436056]">
              {order.productName}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              Order ID: {order._id}
            </p>

            <p className="text-sm text-gray-600">
              Amount: ₹{order.amount}
            </p>

            <p className="text-sm text-gray-600">
              Payment: {order.paymentMethod}
            </p>

            <div className="mt-4">

              <p className="font-semibold text-[#436056] mb-2">
                Order Status
              </p>

              <div className="flex gap-3">

                <StatusStep label="Pending" current={order.orderStatus} />

                <StatusStep label="Confirmed" current={order.orderStatus} />

                <StatusStep label="Packed" current={order.orderStatus} />

                <StatusStep label="Shipped" current={order.orderStatus} />

                <StatusStep label="Delivered" current={order.orderStatus} />

              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatusStep = ({ label, current }) => {

  const steps = ["Pending","Confirmed","Packed","Shipped","Delivered"];

  const active = steps.indexOf(current) >= steps.indexOf(label);

  return (
    <div
      className={`px-3 py-2 rounded-full text-xs font-semibold ${
        active
          ? "bg-[#9DC183] text-white"
          : "bg-gray-200 text-gray-600"
      }`}
    >
      {label}
    </div>
  );
};

export default TrackOrder;
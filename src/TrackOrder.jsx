import React, { useState } from "react";

const API_URL = "http://localhost:5000";

const statusSteps = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered"];

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getStepIndex = (status) => {
    const index = statusSteps.indexOf(status);
    return index === -1 ? 0 : index;
  };

  const handleTrack = async () => {
    if (!orderId || !phone) {
      setError("Please enter Order ID and Phone Number");
      setOrder(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setOrder(null);

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
        setError(data.message || "Order not found");
      }
    } catch (err) {
      setError("Something went wrong while tracking order");
    } finally {
      setLoading(false);
    }
  };

  const activeStep = getStepIndex(order?.orderStatus);

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* SEARCH BOX */}
        <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 mb-8">
          <h1 className="text-3xl font-bold text-[#436056] mb-2">
            Track Your Order
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Enter your Order ID and Phone Number to check latest order status.
          </p>

          <div className="grid md:grid-cols-[1fr_1fr_auto] gap-4">
            <input
              type="text"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
            />

            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
            />

            <button
              onClick={handleTrack}
              disabled={loading}
              className="bg-[#9DC183] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#436056] transition disabled:opacity-60"
            >
              {loading ? "Checking..." : "Track Order"}
            </button>
          </div>

          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </div>

        {/* ORDER DETAILS */}
        {order && (
          <div className="space-y-6">
            {/* TOP STATUS CARD */}
            <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <h2 className="text-xl font-bold text-[#436056]">
                    {order.orderId}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-full bg-[#eef8e8] text-[#436056] text-sm font-semibold">
                    Payment: {order.paymentStatus}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-[#f3efe6] text-[#436056] text-sm font-semibold">
                    Status: {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  <div className="flex items-center justify-between relative mb-3">
                    <div className="absolute top-4 left-0 right-0 h-1 bg-[#e5ddd0] rounded-full" />
                    <div
                      className="absolute top-4 left-0 h-1 bg-[#9DC183] rounded-full transition-all duration-500"
                      style={{
                        width: `${(activeStep / (statusSteps.length - 1)) * 100}%`,
                      }}
                    />

                    {statusSteps.map((step, index) => {
                      const completed = index <= activeStep;
                      return (
                        <div
                          key={step}
                          className="relative z-10 flex flex-col items-center w-full"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                              completed
                                ? "bg-[#9DC183] border-[#9DC183] text-white"
                                : "bg-white border-[#d8d8d8] text-gray-400"
                            }`}
                          >
                            {index + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-start justify-between text-xs sm:text-sm text-[#436056]">
                    {statusSteps.map((step) => (
                      <div key={step} className="w-full text-center font-medium">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCT + DETAILS */}
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
              {/* LEFT CARD */}
              <div className="bg-white rounded-3xl shadow-md p-6">
                <h3 className="text-xl font-bold text-[#436056] mb-5">
                  Order Details
                </h3>

                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-full sm:w-32 h-32 bg-[#f8f8f8] rounded-2xl flex items-center justify-center overflow-hidden">
                    {order.image ? (
                      <img
                        src={order.image}
                        alt={order.productName}
                        className="max-h-28 object-contain"
                      />
                    ) : (
                      <div className="text-xs text-gray-400">No Image</div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[#436056]">
                      {order.productName}
                    </h4>

                    {order.variant && (
                      <p className="text-sm text-gray-500 mt-1">
                        Variant: {order.variant}
                      </p>
                    )}

                    <p className="text-sm text-gray-500 mt-1">
                      Quantity: {order.quantity || 1}
                    </p>

                    <p className="text-lg font-bold text-[#436056] mt-3">
                      ₹{order.amount}
                    </p>

                    <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="bg-[#faf7f2] rounded-xl px-4 py-3">
                        <p className="text-gray-500">Customer</p>
                        <p className="font-semibold text-[#436056]">
                          {order.customerName}
                        </p>
                      </div>

                      <div className="bg-[#faf7f2] rounded-xl px-4 py-3">
                        <p className="text-gray-500">Phone</p>
                        <p className="font-semibold text-[#436056]">
                          {order.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT CARD */}
              <div className="bg-white rounded-3xl shadow-md p-6">
                <h3 className="text-xl font-bold text-[#436056] mb-5">
                  Delivery Info
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="bg-[#faf7f2] rounded-xl px-4 py-4">
                    <p className="text-gray-500 mb-1">Delivery Address</p>
                    <p className="font-medium text-[#436056] leading-6">
                      {order.address || "Address not available"}
                    </p>
                  </div>

                  <div className="bg-[#faf7f2] rounded-xl px-4 py-4">
                    <p className="text-gray-500 mb-1">Ordered On</p>
                    <p className="font-medium text-[#436056]">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>

                  <div className="bg-[#faf7f2] rounded-xl px-4 py-4">
                    <p className="text-gray-500 mb-1">Current Status</p>
                    <p className="font-semibold text-[#436056]">
                      {order.orderStatus}
                    </p>
                  </div>

                  <div className="bg-[#faf7f2] rounded-xl px-4 py-4">
                    <p className="text-gray-500 mb-1">Payment Status</p>
                    <p className="font-semibold text-[#436056]">
                      {order.paymentStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const order = useMemo(() => {
    const saved = localStorage.getItem("snapcharge_last_order");
    return saved ? JSON.parse(saved) : null;
  }, []);

  const items = order?.items || (order?.item ? [order.item] : []);

  if (!order || !items.length) {
    return (
      <div className="min-h-screen bg-[#FAEBD7] pt-32 px-4 sm:px-6 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-[#436056] mb-3">
            No recent order found
          </h2>
          <p className="text-gray-600 mb-5">
            Your order details are not available right now.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#9DC183] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#436056] transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow p-6 sm:p-8">
          <div className="text-center border-b pb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#9DC183] text-white flex items-center justify-center text-3xl font-bold">
              ✓
            </div>

            <h1 className="text-3xl font-bold text-[#436056] mt-4">
              Order Placed Successfully
            </h1>

            <p className="text-gray-600 mt-2">
              Thank you for shopping with SnapCharge.
            </p>

            <p className="text-sm text-gray-500 mt-3">
              Order ID: {order.orderId || "N/A"}
            </p>

            <p className="text-sm text-gray-500">
              Ordered On: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold text-[#436056] mb-4">
              Ordered Items
            </h2>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.id || item._id || index}-${item.variant || ""}`}
                  className="flex gap-4 border border-[#ece5d8] rounded-2xl p-4"
                >
                  <div className="w-20 h-20 rounded-xl bg-[#f8f8f8] overflow-hidden flex items-center justify-center shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No Image</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-[#436056]">{item.name}</p>
                    {item.variant && (
                      <p className="text-sm text-gray-500 mt-1">
                        Variant: {item.variant}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">
                      Qty: {item.quantity || 1}
                    </p>
                    <p className="text-sm font-semibold text-[#436056] mt-1">
                      ₹{(item.price || 0) * (item.quantity || 1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t pt-6">
            <h2 className="text-xl font-bold text-[#436056] mb-4">
              Delivery Details
            </h2>

            <p className="text-gray-700">{order.customer?.fullName}</p>
            <p className="text-gray-700">{order.customer?.phone}</p>
            <p className="text-gray-700">{order.customer?.address}</p>
            <p className="text-gray-700">
              {order.customer?.city}, {order.customer?.state} -{" "}
              {order.customer?.pincode}
            </p>
          </div>

          <div className="mt-6 border-t pt-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-semibold text-[#436056]">
                {order.paymentMethod || "COD"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-[#436056]">₹{order.total}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/my-orders")}
              className="flex-1 bg-[#9DC183] text-white py-3 rounded-full font-semibold hover:bg-[#436056] transition"
            >
              View My Orders
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex-1 border border-[#436056] text-[#436056] py-3 rounded-full font-semibold hover:bg-[#436056] hover:text-white transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
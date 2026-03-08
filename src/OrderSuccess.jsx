import React from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem("snapcharge_last_order") || "null");

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAEBD7] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 max-w-xl w-full text-center">
          <h1 className="text-3xl font-bold text-[#436056] mb-3">
            No recent order found
          </h1>

          <p className="text-gray-600 mb-6">
            Please place an order first.
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
    <div className="min-h-screen bg-[#FAEBD7] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 max-w-xl w-full text-center">
        <div className="text-5xl mb-4">✅</div>

        <h1 className="text-3xl font-bold text-[#436056] mb-3">
          Order Placed Successfully
        </h1>

        <p className="text-gray-600 mb-4">
          Thank you for shopping with SnapCharge.
        </p>

        {order?.orderId && (
          <p className="text-sm text-[#436056] mb-2">
            Order ID: <span className="font-bold">{order.orderId}</span>
          </p>
        )}

        {order?.customer?.fullName && (
          <p className="text-sm text-gray-600 mb-2">
            Customer: {order.customer.fullName}
          </p>
        )}

        {order?.paymentMethod && (
          <p className="text-sm text-gray-600 mb-2">
            Payment Method: {order.paymentMethod}
          </p>
        )}

        {order?.paymentStatus && (
          <p className="text-sm text-gray-600 mb-6">
            Payment Status: {order.paymentStatus}
          </p>
        )}

        <div className="bg-[#f8f8f8] rounded-2xl p-4 text-left mb-6">
          <p className="text-sm font-semibold text-[#436056] mb-2">
            Ordered Item
          </p>

          <div className="flex gap-3 items-center">
            <img
              src={order?.item?.image}
              alt={order?.item?.name}
              className="w-16 h-16 object-contain rounded-lg bg-white"
            />

            <div>
              <p className="font-medium text-[#436056] text-sm">
                {order?.item?.name}
              </p>

              <p className="text-xs text-gray-500">
                ₹{order?.item?.price} × {order?.item?.quantity || 1}
              </p>

              <p className="text-sm font-semibold text-[#436056] mt-1">
                Total: ₹{order?.total}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-[#9DC183] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#436056] transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/cart"
            className="border border-[#9DC183] text-[#436056] px-6 py-3 rounded-full font-semibold hover:bg-[#9DC183] hover:text-white transition"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
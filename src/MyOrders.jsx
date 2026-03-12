import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://snapcharge-backend-prod-env.eba-m6tqr9gn.eu-north-1.elasticbeanstalk.com");

const MyOrders = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("snapcharge_token");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(
          `${data.message || "Failed to fetch orders"}${
            data.error ? ` - ${data.error}` : ""
          }`
        );
        return;
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.log("MY ORDERS ERROR:", error);
      alert("Something went wrong while fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#436056] mb-8">My Orders</h1>

        {loading ? (
          <div className="bg-white rounded-3xl shadow p-8 text-center">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-8 text-center text-[#436056]">
            No orders found
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                onClick={() => navigate(`/my-orders/${order._id}`)}
                className="bg-white rounded-3xl shadow p-5 cursor-pointer hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-[#f7f7f7] overflow-hidden flex items-center justify-center">
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
                    <h2 className="text-lg font-semibold text-[#436056]">
                      {order.productName}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      ₹{order.amount} • Qty: {order.quantity}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <span className="px-4 py-2 rounded-full bg-[#eef8e8] text-[#436056] text-sm font-semibold">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
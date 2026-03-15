import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://api.snapchargee.in");

const MyOrders = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("snapcharge_token");
  const user = localStorage.getItem("snapcharge_user");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http://") || image.startsWith("https://")) return image;
    if (image.startsWith("/")) return image;
    return `/${image}`;
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("snapcharge_token");
        localStorage.removeItem("snapcharge_user");
        navigate("/login");
        return;
      }

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to fetch orders");
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
    if (!token || !user) {
      navigate("/login");
      return;
    }

    fetchOrders();
  }, [token, user, navigate]);

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
                        src={getImageUrl(order.productImage)}
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

                    {order.variant && (
                      <p className="text-sm text-gray-500 mt-1">
                        Variant: {order.variant}
                      </p>
                    )}

                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>

                    {order.courierName && (
                      <p className="text-sm text-gray-500 mt-1">
                        Courier: {order.courierName}
                      </p>
                    )}

                    {order.awbCode && (
                      <p className="text-sm text-gray-500 mt-1">
                        AWB: {order.awbCode}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2">

                      {order.trackingUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(order.trackingUrl, "_blank");
                          }}
                          className="px-4 py-2 rounded-full bg-[#9DC183] text-white text-sm font-semibold hover:bg-[#436056] transition"
                        >
                          Track Shipment
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/my-orders/${order._id}`);
                        }}
                        className="px-4 py-2 rounded-full border border-[#436056] text-[#436056] text-sm font-semibold hover:bg-[#436056] hover:text-white transition"
                      >
                        View Details
                      </button>

                    </div>
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
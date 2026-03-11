import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://snapcharge-backend-env.eba-dci8dbp5.eu-north-1.elasticbeanstalk.com";

const statusOptions = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
];

const AdminPanel = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("snapcharge_admin_token");

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [showNewOrderPopup, setShowNewOrderPopup] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null);

  const previousOrderCount = useRef(0);
  const isFirstLoad = useRef(true);

  const handleLogout = () => {
    sessionStorage.removeItem("snapcharge_admin_token");
    sessionStorage.removeItem("snapcharge_admin_email");
    navigate("/admin-login");
  };

  const fetchOrders = async (showPopupForNew = false) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        const newOrders = data.orders || [];

        if (
          showPopupForNew &&
          !isFirstLoad.current &&
          newOrders.length > previousOrderCount.current
        ) {
          setLatestOrder(newOrders[0]);
          setShowNewOrderPopup(true);
        }

        previousOrderCount.current = newOrders.length;
        setOrders(newOrders);
        setFilteredOrders(newOrders);
      } else {
        if (res.status === 401) {
          handleLogout();
          return;
        }
        setOrders([]);
        setFilteredOrders([]);
      }
    } catch (error) {
      console.log("Fetch orders error:", error);
      if (!showPopupForNew) {
        alert("Failed to fetch admin orders");
      }
    } finally {
      setLoading(false);
      isFirstLoad.current = false;
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
      return;
    }

    setLoading(true);
    fetchOrders(false);
  }, []);

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      fetchOrders(true);
    }, 10000);

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    let updated = [...orders];

    if (selectedStatus !== "All") {
      updated = updated.filter((order) => order.orderStatus === selectedStatus);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      updated = updated.filter((order) => {
        return (
          order.customerName?.toLowerCase().includes(q) ||
          order.phone?.toLowerCase().includes(q) ||
          order.productName?.toLowerCase().includes(q) ||
          order.paymentMethod?.toLowerCase().includes(q) ||
          order.paymentStatus?.toLowerCase().includes(q) ||
          order._id?.toLowerCase().includes(q)
        );
      });
    }

    setFilteredOrders(updated);
  }, [orders, selectedStatus, search]);

  const summary = useMemo(() => {
    const totalOrders = orders.length;

    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.amount || 0),
      0
    );

    const paidOrders = orders.filter((o) => o.paymentStatus === "paid").length;
    const codOrders = orders.filter((o) => o.paymentMethod === "COD").length;
    const pendingOrders = orders.filter(
      (o) => o.orderStatus === "Pending"
    ).length;

    const today = new Date().toLocaleDateString();
    const todayOrders = orders.filter(
      (o) => new Date(o.createdAt).toLocaleDateString() === today
    ).length;

    return {
      totalOrders,
      totalRevenue,
      paidOrders,
      codOrders,
      pendingOrders,
      todayOrders,
    };
  }, [orders]);

  const revenueData = useMemo(() => {
    const revenueMap = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString();

      if (!revenueMap[date]) {
        revenueMap[date] = 0;
      }

      revenueMap[date] += Number(order.amount || 0);
    });

    return Object.keys(revenueMap).map((date) => ({
      date,
      revenue: revenueMap[date],
    }));
  }, [orders]);

  const handleStatusUpdate = async (orderId, status) => {
    try {
      setActionLoadingId(orderId);

      const res = await fetch(`${API_URL}/api/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, orderStatus: status } : order
          )
        );
      } else {
        if (res.status === 401) {
          handleLogout();
          return;
        }
        alert(data.message || "Failed to update status");
      }
    } catch (error) {
      console.log("Status update error:", error);
      alert("Something went wrong while updating status");
    } finally {
      setActionLoadingId("");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;

    try {
      setActionLoadingId(orderId);

      const res = await fetch(`${API_URL}/api/admin/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      } else {
        if (res.status === 401) {
          handleLogout();
          return;
        }
        alert(data.message || "Failed to delete order");
      }
    } catch (error) {
      console.log("Delete error:", error);
      alert("Something went wrong while deleting order");
    } finally {
      setActionLoadingId("");
    }
  };

  const getPaymentBadge = (order) => {
    if (order.paymentMethod === "COD") {
      return "bg-yellow-100 text-yellow-700";
    }
    if (order.paymentStatus === "paid") {
      return "bg-green-100 text-green-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Packed":
        return "bg-purple-100 text-purple-700";
      case "Confirmed":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {showNewOrderPopup && latestOrder && (
          <div className="fixed top-24 right-4 z-50 bg-white shadow-2xl rounded-2xl border border-[#e8decf] p-4 w-[320px]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[#436056]">
                  🛒 New Order Received
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {latestOrder.customerName}
                </p>
                <p className="text-sm text-gray-500">
                  {latestOrder.productName}
                </p>
                <p className="text-sm font-semibold text-[#436056] mt-1">
                  ₹{latestOrder.amount}
                </p>
              </div>

              <button
                onClick={() => setShowNewOrderPopup(false)}
                className="text-gray-400 hover:text-black text-lg"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#436056]">
              SnapCharge Admin Panel
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Manage orders, payment status, and delivery updates.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-white border border-[#436056] text-[#436056] px-5 py-3 rounded-xl font-semibold hover:bg-[#f5f5f5] transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-3xl shadow p-5">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-2xl font-bold text-[#436056] mt-2">
              {summary.totalOrders}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-5">
            <p className="text-sm text-gray-500">Revenue</p>
            <h2 className="text-2xl font-bold text-[#436056] mt-2">
              ₹{summary.totalRevenue}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-5">
            <p className="text-sm text-gray-500">Paid Orders</p>
            <h2 className="text-2xl font-bold text-[#436056] mt-2">
              {summary.paidOrders}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-5">
            <p className="text-sm text-gray-500">COD Orders</p>
            <h2 className="text-2xl font-bold text-[#436056] mt-2">
              {summary.codOrders}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-5">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-2xl font-bold text-[#436056] mt-2">
              {summary.pendingOrders}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-5">
            <p className="text-sm text-gray-500">Today Orders</p>
            <h2 className="text-2xl font-bold text-[#436056] mt-2">
              {summary.todayOrders}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-[#436056] mb-4">
            Revenue Analytics
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#9DC183"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-3xl shadow p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <input
                type="text"
                placeholder="Search by customer, phone, product, order id..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183] w-full"
              />

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183] min-w-[180px]"
              >
                <option value="All">All Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => fetchOrders(false)}
              className="bg-[#9DC183] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#436056] transition"
            >
              Refresh Orders
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-[#436056] font-medium">
              Loading orders...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-10 text-center text-[#436056] font-medium">
              No orders found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead className="bg-[#f7f5f1]">
                  <tr className="text-left text-sm text-[#436056]">
                    <th className="px-4 py-4">Customer</th>
                    <th className="px-4 py-4">Phone</th>
                    <th className="px-4 py-4">Product</th>
                    <th className="px-4 py-4">Amount</th>
                    <th className="px-4 py-4">Payment</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Date</th>
                    <th className="px-4 py-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-t border-[#f0ece6] text-sm text-[#436056] align-top"
                    >
                      <td className="px-4 py-4">
                        <div className="font-semibold">{order.customerName}</div>
                        <div className="text-xs text-gray-500 mt-1 break-all">
                          {order._id}
                        </div>
                      </td>

                      <td className="px-4 py-4">{order.phone}</td>

                      <td className="px-4 py-4">
                        <div className="font-medium">{order.productName}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Variant: {order.variant || "Default"}
                        </div>
                        <div className="text-xs text-gray-500">
                          Qty: {order.quantity || 1}
                        </div>
                      </td>

                      <td className="px-4 py-4 font-semibold">
                        ₹{order.amount}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentBadge(
                            order
                          )}`}
                        >
                          {order.paymentMethod} / {order.paymentStatus}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>

                        <div className="mt-3">
                          <select
                            value={order.orderStatus}
                            onChange={(e) =>
                              handleStatusUpdate(order._id, e.target.value)
                            }
                            disabled={actionLoadingId === order._id}
                            className="border border-[#ddd] rounded-lg px-3 py-2 text-xs outline-none focus:border-[#9DC183]"
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>

                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          disabled={actionLoadingId === order._id}
                          className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-xl font-medium hover:bg-red-100 transition disabled:opacity-60"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
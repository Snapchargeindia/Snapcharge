import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://snapcharge-backend-prod-env.eba-m6tqr9gn.eu-north-1.elasticbeanstalk.com");

const statusSteps = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered"];

const MyOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("snapcharge_token");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shouldRedirectOrders, setShouldRedirectOrders] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          alert(data.message || "Order not found");
          setShouldRedirectOrders(true);
          return;
        }

        setOrder(data.order);
      } catch (error) {
        console.log("MY ORDER DETAIL ERROR:", error);
        alert("Something went wrong");
        setShouldRedirectOrders(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, token, navigate]);

  useEffect(() => {
    if (shouldRedirectOrders) {
      navigate("/my-orders");
    }
  }, [shouldRedirectOrders, navigate]);

  const activeStep = statusSteps.indexOf(order?.orderStatus);

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/my-orders")}
          className="mb-6 bg-white px-5 py-2 rounded-full shadow text-[#436056] font-medium"
        >
          ← Back
        </button>

        {loading ? (
          <div className="bg-white rounded-3xl shadow p-8 text-center">
            Loading...
          </div>
        ) : order ? (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow p-6">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="w-32 h-32 rounded-2xl bg-[#f7f7f7] overflow-hidden flex items-center justify-center">
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
                  <h1 className="text-2xl font-bold text-[#436056]">
                    {order.productName}
                  </h1>
                  <p className="text-gray-500 mt-2">₹{order.amount}</p>
                  <p className="text-gray-500">Qty: {order.quantity}</p>
                  <p className="text-gray-500">
                    Payment: {order.paymentMethod}
                  </p>
                  <p className="text-gray-500">
                    Payment Status: {order.paymentStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow p-6">
              <h2 className="text-xl font-bold text-[#436056] mb-5">
                Order Progress
              </h2>

              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  <div className="flex items-center justify-between relative mb-3">
                    <div className="absolute top-4 left-0 right-0 h-1 bg-[#e5ddd0] rounded-full" />
                    <div
                      className="absolute top-4 left-0 h-1 bg-[#9DC183] rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          activeStep >= 0
                            ? (activeStep / (statusSteps.length - 1)) * 100
                            : 0
                        }%`,
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

            <div className="bg-white rounded-3xl shadow p-6">
              <h2 className="text-xl font-bold text-[#436056] mb-4">
                Delivery Details
              </h2>
              <p className="text-gray-600">{order.customerName}</p>
              <p className="text-gray-600">{order.phone}</p>
              <p className="text-gray-600">{order.address}</p>
              <p className="text-gray-600">
                {order.city}, {order.state} - {order.pincode}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyOrderDetail;
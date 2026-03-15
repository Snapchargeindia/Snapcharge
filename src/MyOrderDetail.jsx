import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://api.snapchargee.in");

const STATUS_STEPS = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const MyOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("snapcharge_token");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `/${image}`;
  };

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

        if (!data.success) {
          navigate("/my-orders");
          return;
        }

        setOrder(data.order);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, token, navigate]);

  const activeStep = useMemo(() => {
    const index = STATUS_STEPS.indexOf(order?.orderStatus);
    return index === -1 ? 0 : index;
  }, [order]);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const timelineSteps = useMemo(() => {
    if (!order) return [];

    return [
      {
        title: "Order Confirmed",
        date: formatDate(order.confirmedAt),
        active: activeStep >= 1,
      },
      {
        title: "Packed",
        date: formatDate(order.packedAt),
        active: activeStep >= 2,
      },
      {
        title: "Shipped",
        date: formatDate(order.shippedAt),
        active: activeStep >= 3,
      },
      {
        title: "Out For Delivery",
        date: formatDate(order.outForDeliveryAt),
        active: activeStep >= 4,
      },
      {
        title: "Delivered",
        date: formatDate(order.deliveredAt),
        active: activeStep >= 5,
      },
    ];
  }, [order, activeStep]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAEBD7] pt-32 text-center">
        Loading...
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => navigate("/my-orders")}
          className="mb-6 bg-white px-5 py-2 rounded-full shadow"
        >
          ← Back
        </button>

        {/* PRODUCT CARD */}

        <div className="bg-white rounded-3xl shadow p-6 mb-6">
          <div className="flex gap-5">

            <div className="w-28 h-28 bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={getImageUrl(order.productImage)}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#436056]">
                {order.productName}
              </h1>

              <p className="text-gray-500 mt-2">
                ₹{order.amount}
              </p>

              <p className="text-gray-500">
                Qty: {order.quantity}
              </p>

              <p className="text-gray-500">
                Payment: {order.paymentMethod}
              </p>

              {order.trackingUrl && (
                <button
                  onClick={() => window.open(order.trackingUrl)}
                  className="mt-3 px-5 py-2 bg-[#9DC183] text-white rounded-full"
                >
                  Track Shipment
                </button>
              )}
            </div>
          </div>
        </div>

        {/* TIMELINE */}

        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-xl font-bold text-[#436056] mb-8">
            Order Tracking
          </h2>

          <div className="space-y-10">

            {timelineSteps.map((step, index) => (

              <div key={index} className="flex items-start gap-6">

                {/* DOT */}

                <div className="relative">

                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      step.active
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {step.active && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>

                  {index !== timelineSteps.length - 1 && (
                    <div className="absolute left-[11px] top-6 w-[2px] h-16 bg-gray-200" />
                  )}
                </div>

                {/* TEXT */}

                <div>

                  <h3
                    className={`text-lg font-medium ${
                      step.active ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </h3>

                  {step.date && (
                    <p className="text-gray-400 text-sm mt-1">
                      {step.date}
                    </p>
                  )}
                </div>

              </div>

            ))}
          </div>
        </div>

        {/* DELIVERY */}

        <div className="bg-white rounded-3xl shadow p-6 mt-6">

          <h2 className="text-xl font-bold text-[#436056] mb-4">
            Delivery Address
          </h2>

          <p>{order.customerName}</p>
          <p>{order.phone}</p>
          <p>{order.address}</p>
          <p>
            {order.city}, {order.state} - {order.pincode}
          </p>

        </div>

      </div>
    </div>
  );
};

export default MyOrderDetail;
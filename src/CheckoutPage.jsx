import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://api.snapchargee.in");

const CheckoutPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("snapcharge_token");
  const { cartItems, cartTotal, clearCart } = useCart();

  const buyNowItem = useMemo(() => {
    const saved = localStorage.getItem("snapcharge_buy_now");
    return saved ? JSON.parse(saved) : null;
  }, []);

  const items = useMemo(() => {
    return buyNowItem ? [buyNowItem] : cartItems;
  }, [buyNowItem, cartItems]);

  const total = useMemo(() => {
    if (buyNowItem) {
      return Number(buyNowItem.price || 0) * Number(buyNowItem.quantity || 1);
    }
    return cartTotal;
  }, [buyNowItem, cartTotal]);

  const loggedInUser = useMemo(() => {
    const savedUser = localStorage.getItem("snapcharge_user");
    return savedUser ? JSON.parse(savedUser) : null;
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
  });

  useEffect(() => {
    if (loggedInUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: loggedInUser.name || "",
        phone: loggedInUser.phone || "",
        address: loggedInUser.addressLine || "",
        city: loggedInUser.city || "",
        state: loggedInUser.state || "",
        pincode: loggedInUser.pincode || "",
      }));
    }
  }, [loggedInUser]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    if (name === "pincode") {
      value = value.replace(/\D/g, "").slice(0, 6);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all fields");
      return false;
    }

    return true;
  };

  const saveUserAddress = async () => {
    if (!loggedInUser?._id) return;

    try {
      await fetch(`${API_URL}/api/user/update-address/${loggedInUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          addressLine: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        }),
      });
    } catch (error) {
      console.log("Address save error:", error);
    }
  };

  const buildPayloadForItem = (item) => {
    return {
      userId: loggedInUser?._id || null,
      customerName: formData.fullName,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      productName: item.name,
      productId: item.id || item._id || "",
      productImage: item.image || "",
      variant: item.variant || "Default",
      quantity: item.quantity || 1,
      amount: Number(item.price || 0) * Number(item.quantity || 1),
    };
  };

  const handleCODOrder = async () => {
    try {
      setLoading(true);

      await saveUserAddress(); // 👈 address database me save

      for (const item of items) {
        const payload = buildPayloadForItem(item);

        const res = await fetch(`${API_URL}/api/payment/create-cod-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          alert("Failed to place order");
          return;
        }
      }

      if (buyNowItem) {
        localStorage.removeItem("snapcharge_buy_now");
      } else {
        clearCart();
      }

      navigate("/order-success", { replace: true });
    } catch (error) {
      console.log(error);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (formData.paymentMethod === "COD") {
      await handleCODOrder();
    }
  };

  if (!items.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cart Empty
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.5fr,0.8fr] gap-10">

        <div className="bg-white rounded-3xl shadow p-8">
          <h1 className="text-3xl font-bold text-[#436056] mb-6">Checkout</h1>

          <form onSubmit={handlePlaceOrder} className="space-y-4">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-xl px-4 py-3"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border rounded-xl px-4 py-3"
              />

              <input
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="border rounded-xl px-4 py-3"
              />
            </div>

            <input
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#9DC183] text-white py-3 rounded-full font-semibold"
            >
              {loading ? "Processing..." : `Place Order ₹${total}`}
            </button>

          </form>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          {items.map((item) => (
            <div key={item.id} className="flex gap-3 mb-4">
              <img
                src={item.image}
                alt=""
                className="w-20 h-20 object-contain"
              />

              <div>
                <p className="font-semibold">{item.name}</p>
                <p>₹{item.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
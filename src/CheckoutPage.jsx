import React, { useEffect, useMemo, useState } from "react";
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
    fullName: loggedInUser?.name || "",
    phone: loggedInUser?.phone
      ? String(loggedInUser.phone).replace(/^\+91/, "")
      : "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
    addressType: "HOME",
  });

  const [savedAddress, setSavedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const existingAddress = localStorage.getItem("snapcharge_saved_address");
    if (existingAddress) {
      const parsed = JSON.parse(existingAddress);
      setSavedAddress(parsed);
      setFormData((prev) => ({
        ...prev,
        fullName: parsed.fullName || prev.fullName || "",
        phone: parsed.phone || prev.phone || "",
        address: parsed.address || "",
        city: parsed.city || "",
        state: parsed.state || "",
        pincode: parsed.pincode || "",
        addressType: parsed.addressType || "HOME",
      }));
      setShowAddressForm(false);
    }
  }, []);

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

    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      alert("Please enter a valid Indian phone number");
      return false;
    }

    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      alert("Please enter a valid 6-digit pincode");
      return false;
    }

    if (!items.length) {
      alert("No product selected for checkout.");
      return false;
    }

    return true;
  };

  const handleSaveAddress = () => {
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all address fields before saving.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      alert("Please enter a valid Indian phone number");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    const addressToSave = {
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      addressType: formData.addressType || "HOME",
    };

    localStorage.setItem(
      "snapcharge_saved_address",
      JSON.stringify(addressToSave)
    );

    setSavedAddress(addressToSave);
    setShowAddressForm(false);
  };

  const handleChangeAddress = () => {
    setShowAddressForm(true);
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
      variant: item.variant || item.selectedVariant || "Default",
      quantity: Number(item.quantity || 1),
      amount: Number(item.price || 0) * Number(item.quantity || 1),
    };
  };

  const handleCODOrder = async () => {
    try {
      setLoading(true);

      for (const item of items) {
        const payload = buildPayloadForItem(item);

        const res = await fetch(`${API_URL}/api/payment/create-cod-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          alert(
            `${data.message || "Failed to place COD order"}${
              data.error ? ` - ${data.error}` : ""
            }`
          );
          return;
        }
      }

      localStorage.setItem(
        "snapcharge_last_order",
        JSON.stringify({
          orderId: `SC${Date.now()}`,
          customer: formData,
          items,
          total,
          createdAt: new Date().toISOString(),
          paymentMethod: "COD",
          paymentStatus: "COD_PENDING",
        })
      );

      if (buyNowItem) {
        localStorage.removeItem("snapcharge_buy_now");
      } else {
        clearCart();
      }

      navigate("/order-success", { replace: true });
    } catch (error) {
      console.log("COD order error:", error);
      alert("Something went wrong while placing COD order");
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handleOnlinePayment = async () => {
    try {
      setLoading(true);

      const isLoaded = await loadRazorpayScript();

      if (!isLoaded) {
        alert("Razorpay SDK failed to load. Check internet connection.");
        return;
      }

      const payload = {
        userId: loggedInUser?._id || null,
        customerName: formData.fullName,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        items: items.map((item) => ({
          productName: item.name,
          productId: item.id || item._id || "",
          productImage: item.image || "",
          variant: item.variant || item.selectedVariant || "Default",
          quantity: Number(item.quantity || 1),
          price: Number(item.price || 0),
          amount: Number(item.price || 0) * Number(item.quantity || 1),
        })),
        totalAmount: Number(total),
      };

      const res = await fetch(`${API_URL}/api/payment/create-online-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to create online payment order");
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "Snapcharge",
        description: "Order Payment",
        order_id: data.orderId,
        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              `${API_URL}/api/payment/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  userId: loggedInUser?._id || null,
                  customer: formData,
                  items,
                  total,
                }),
              }
            );

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              alert(verifyData.message || "Payment verification failed");
              return;
            }

            localStorage.setItem(
              "snapcharge_last_order",
              JSON.stringify({
                orderId:
                  verifyData.orderId ||
                  response.razorpay_order_id ||
                  `SC${Date.now()}`,
                customer: formData,
                items,
                total,
                createdAt: new Date().toISOString(),
                paymentMethod: "Online",
                paymentStatus: "PAID",
                paymentId: response.razorpay_payment_id,
              })
            );

            if (buyNowItem) {
              localStorage.removeItem("snapcharge_buy_now");
            } else {
              clearCart();
            }

            navigate("/order-success", { replace: true });
          } catch (error) {
            console.log("Payment verification error:", error);
            alert("Payment done but verification failed");
          }
        },
        prefill: {
          name: formData.fullName,
          contact: formData.phone,
        },
        notes: {
          address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        },
        theme: {
          color: "#9DC183",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log("Online payment error:", error);
      alert("Something went wrong during online payment");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (formData.paymentMethod === "COD") {
      await handleCODOrder();
    } else {
      await handleOnlinePayment();
    }
  };

  if (!items.length) {
    return (
      <div className="min-h-screen bg-[#FAEBD7] pt-32 px-4 sm:px-6 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-[#436056] mb-3">
            No product selected
          </h2>
          <p className="text-gray-600 mb-5">
            Please add a product to cart or use Buy Now.
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
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.5fr,0.8fr] gap-10">
        <div className="bg-white rounded-3xl shadow p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-[#436056] mb-2">Checkout</h1>
          <p className="text-sm text-[#436056] mb-6">
            We currently deliver only within India.
          </p>

          {savedAddress && !showAddressForm && (
            <div className="border border-[#e5e7eb] rounded-2xl p-5 mb-6 bg-[#fcfcfc]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-bold text-[#111] mb-2">
                    Deliver to:
                  </p>

                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xl font-bold text-[#111]">
                      {savedAddress.fullName}
                    </span>
                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#ececec] text-[#666]">
                      {savedAddress.addressType}
                    </span>
                  </div>

                  <p className="text-gray-800 leading-7">
                    {savedAddress.address}, {savedAddress.city},{" "}
                    {savedAddress.state} {savedAddress.pincode}
                  </p>

                  <p className="text-gray-900 mt-3 text-lg">
                    {savedAddress.phone}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleChangeAddress}
                  className="border border-[#d1d5db] px-5 py-2 rounded-xl font-semibold text-[#2563eb] hover:bg-[#f8fafc] transition"
                >
                  Change
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            {showAddressForm && (
              <>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  className="w-full border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
                />

                <textarea
                  name="address"
                  placeholder="Full Address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
                  />

                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength={6}
                    className="w-full border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
                  />

                  <select
                    name="addressType"
                    value={formData.addressType}
                    onChange={handleChange}
                    className="w-full border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183] bg-white"
                  >
                    <option value="HOME">HOME</option>
                    <option value="WORK">WORK</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>

                <input
                  type="text"
                  value="India"
                  disabled
                  className="w-full border border-[#ddd] rounded-xl px-4 py-3 bg-gray-100 text-gray-500"
                />

                <button
                  type="button"
                  onClick={handleSaveAddress}
                  className="w-full bg-[#436056] text-white py-3 rounded-full font-semibold hover:bg-[#365045] transition"
                >
                  Save Address
                </button>
              </>
            )}

            <div>
              <p className="text-sm font-semibold text-[#436056] mb-2">
                Payment Method
              </p>

              <div className="flex flex-col gap-2 text-sm text-[#436056]">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === "COD"}
                    onChange={handleChange}
                  />
                  Cash on Delivery
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online"
                    checked={formData.paymentMethod === "Online"}
                    onChange={handleChange}
                  />
                  Online Payment
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-[#9DC183] text-white py-3 rounded-full font-semibold hover:bg-[#436056] transition disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : formData.paymentMethod === "Online"
                ? `Pay Now ₹${total}`
                : "Place Order"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-3xl shadow p-6 h-fit">
          <h2 className="text-2xl font-bold text-[#436056] mb-5">
            Order Summary
          </h2>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={`${item.id || item._id || index}-${item.variant || ""}`}
                className="flex gap-3 border-b pb-4"
              >
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded-lg bg-[#f8f8f8]"
                />

                <div className="flex-1">
                  <p className="font-semibold text-[#436056] text-sm">
                    {item.name}
                  </p>

                  {item.subtitle && (
                    <p className="text-xs text-gray-500 mt-1">
                      {item.subtitle}
                    </p>
                  )}

                  {(item.variant || item.selectedVariant) && (
                    <p className="text-xs text-gray-500 mt-1">
                      Variant: {item.variant || item.selectedVariant}
                    </p>
                  )}

                  <p className="text-sm text-gray-600 mt-2">
                    Qty: {item.quantity || 1}
                  </p>

                  <p className="text-sm font-semibold text-[#436056] mt-1">
                    ₹{Number(item.price || 0) * Number(item.quantity || 1)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-5 mt-5 border-t">
            <div className="flex justify-between text-lg font-bold text-[#436056]">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
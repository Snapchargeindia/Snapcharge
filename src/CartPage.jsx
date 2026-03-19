import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { requireUserLogin } from "./authGuard";

// ─────────────────────────────────────────────────────────────
// Shiprocket UI assets (from official docs — PROD)
// ─────────────────────────────────────────────────────────────
const SR_UI_CSS    = "https://checkout-ui.shiprocket.com/assets/styles/shopify.css";
const SR_UI_SCRIPT = "https://checkout-ui.shiprocket.com/assets/js/channels/login.js";

const loadShiprocketAssets = () =>
  new Promise((resolve) => {
    if (!document.querySelector(`link[href="${SR_UI_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel   = "stylesheet";
      link.href  = SR_UI_CSS;
      document.head.appendChild(link);
    }
    if (!document.querySelector(`script[src="${SR_UI_SCRIPT}"]`)) {
      const script   = document.createElement("script");
      script.src     = SR_UI_SCRIPT;
      script.onload  = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    } else {
      resolve(true);
    }
  });

// ─────────────────────────────────────────────────────────────
// CART PAGE
// ─────────────────────────────────────────────────────────────
const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();

  const [loading, setLoading] = useState(false);

  // Preload Shiprocket assets on mount
  useEffect(() => {
    loadShiprocketAssets();
  }, []);

  // ── Checkout handler ──────────────────────────────────────
  const handleCheckout = async () => {
    // Step 1: Check login
    const allowed = requireUserLogin(
      navigate,
      "Please login first to continue checkout",
      "/login"
    );
    if (!allowed) return;

    setLoading(true);

    try {
      // Step 2: Get Shiprocket access token from backend
      const tokenRes = await fetch(
        "http://localhost:5000/api/shiprocket/initiate",
        {
          method     : "POST",
          headers    : { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const tokenData = await tokenRes.json();

      if (!tokenData.success || !tokenData.token) {
        alert("Failed to initiate Shiprocket checkout. Please try again.");
        setLoading(false);
        return;
      }

      // Step 3: Make sure Shiprocket JS is loaded
      await loadShiprocketAssets();

      if (!window.HeadlessCheckout) {
        alert("Shiprocket failed to load. Please refresh and try again.");
        setLoading(false);
        return;
      }

      // Step 4: Open Shiprocket OTP + address dialog
      const obj = {
        amount    : cartTotal,
        themecolor: "436056", // brand green without #
        image     : "", // optional: your logo CDN URL
      };

      window.HeadlessCheckout.buyNow(
        { preventDefault: () => {} },
        tokenData.token,
        obj,
        async (response) => {
          console.log("Shiprocket response:", response);

          if (response?.status === "success") {
            const addresses = response.data?.addresses || [];
            const phone     = response.data?.phone || "";
            const address   = addresses[0] || {};

            // Step 5: Create order on backend with fetched address
            const orderRes = await fetch(
              "http://localhost:5000/api/shiprocket/create-order",
              {
                method     : "POST",
                headers    : { "Content-Type": "application/json" },
                credentials: "include",
                body       : JSON.stringify({
                  cartItems,
                  cartTotal,
                  customer: {
                    name   : `${address.first_name || ""} ${address.last_name || ""}`.trim(),
                    email  : address.email   || "",
                    phone  : address.phone   || phone || "",
                    address: address.line1   || "",
                    city   : address.city    || "",
                    pincode: address.pincode || "",
                    state  : address.state   || "",
                  },
                }),
              }
            );

            const orderData = await orderRes.json();

            if (orderData.checkoutUrl) {
              window.location.href = orderData.checkoutUrl;
            } else {
              alert(`✅ Order placed! Order ID: ${orderData.orderId || "N/A"}`);
            }
          } else {
            alert("Checkout was cancelled. Please try again.");
          }

          setLoading(false);
        }
      );
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // ── Empty cart ────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAEBD7] pt-32 pb-16 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold text-[#436056] mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 mb-6">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          to="/"
          className="bg-[#9DC183] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#436056] transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // ── Cart page ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.5fr,0.8fr] gap-10">

        {/* Cart items */}
        <div>
          <h1 className="text-3xl font-bold mb-8 text-[#436056]">My Cart</h1>
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={`${item.id || index}-${item.variant || ""}`}
                className="flex flex-col sm:flex-row items-center gap-4 border border-[#e4d7c7] p-4 rounded-2xl bg-white shadow-sm"
              >
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-24 h-24 object-contain rounded-lg bg-[#f8f8f8]"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-semibold text-[#436056]">
                    {item.name}
                  </h2>
                  {item.subtitle && (
                    <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
                  )}
                  {item.variant && (
                    <p className="text-sm text-gray-500 mt-1">
                      Variant: {item.variant}
                    </p>
                  )}
                  <p className="text-gray-600 mt-2">
                    ₹{Number(item.price || 0) * Number(item.quantity || 1)}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, "dec")}
                      className="w-8 h-8 border border-[#cfd8cf] rounded-full flex items-center justify-center hover:bg-[#9DC18322] transition"
                    >
                      -
                    </button>
                    <span className="font-semibold text-[#436056]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, "inc")}
                      className="w-8 h-8 border border-[#cfd8cf] rounded-full flex items-center justify-center hover:bg-[#9DC18322] transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Price summary */}
        <div className="bg-white rounded-2xl border border-[#e4d7c7] p-6 h-fit shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-[#436056]">
            Price Details
          </h2>
          <div className="space-y-3 text-sm text-[#436056]">
            <div className="flex justify-between">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>₹0</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span>FREE</span>
            </div>
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg text-[#436056]">
            <span>Total Amount</span>
            <span>₹{cartTotal}</span>
          </div>

          {/* ✅ Proceed to Checkout */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full mt-6 bg-[#9DC183] text-white py-3 rounded-lg font-semibold hover:bg-[#436056] transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="30" strokeDashoffset="10"/>
                </svg>
                Loading…
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.4"/>
                  <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Proceed to Checkout
              </>
            )}
          </button>

          <button
            onClick={clearCart}
            className="w-full mt-3 border border-[#d9ddd6] py-2 rounded-lg text-[#436056] hover:bg-gray-50 transition"
          >
            Clear Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default CartPage;
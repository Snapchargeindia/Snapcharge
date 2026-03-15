import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { requireUserLogin } from "./authGuard";

const CartPage = () => {
  const navigate = useNavigate();

  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();

  const handleCheckout = () => {
    const allowed = requireUserLogin(
      navigate,
      "Please login first to continue checkout",
      "/login"
    );

    if (!allowed) return;

    navigate("/checkout");
  };

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

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.5fr,0.8fr] gap-10">
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
                    <p className="text-sm text-gray-500 mt-1">
                      {item.subtitle}
                    </p>
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

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-[#9DC183] text-white py-3 rounded-lg font-semibold hover:bg-[#436056] transition"
          >
            Proceed to Checkout
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
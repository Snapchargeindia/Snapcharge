import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { requireUserLogin } from "./authGuard";

const CartPage = () => {
  const navigate = useNavigate();

  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();

  const isLoggedIn = useMemo(() => {
    return !!localStorage.getItem("snapcharge_user");
  }, []);

  if (!isLoggedIn) {
    requireUserLogin(navigate, "Please login first to view your cart");
    return null;
  }

  const handleCheckout = () => {
    const allowed = requireUserLogin(
      navigate,
      "Please login first to continue checkout"
    );

    if (!allowed) return;

    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAEBD7] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold text-[#436056] mb-4">
          Your Cart is Empty
        </h1>

        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything yet.
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
    <div className="min-h-screen bg-[#FAEBD7] px-4 sm:px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#436056]">My Cart</h1>

        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-4 border border-[#e4d7c7] p-4 rounded-2xl bg-white shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain rounded-lg"
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

                <p className="text-gray-600 mt-1">₹{item.price}</p>

                <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                  <button
                    onClick={() => updateQuantity(item.id, "dec")}
                    className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-[#9DC18322]"
                  >
                    -
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, "inc")}
                    className="w-8 h-8 border rounded-full flex items-center justify-center hover:bg-[#9DC18322]"
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

        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-[#436056]">
            Total: ₹{cartTotal}
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={clearCart}
              className="px-5 py-2 border rounded-lg text-[#436056] hover:bg-gray-100 transition"
            >
              Clear Cart
            </button>

            <button
              onClick={handleCheckout}
              className="bg-[#9DC183] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#436056] transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
import React from "react";
import { useCart } from "../CartContext";

const ProductCard = ({ id, title, subtitle, price, image }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      name: title,
      price,
      image,
      subtitle,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition">
      <div className="w-full h-40 flex items-center justify-center rounded-xl bg-[#FAF3E3] mb-3 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <h3 className="text-sm font-semibold text-[#1f2933] text-center">
        {title}
      </h3>

      {subtitle && (
        <p className="mt-1 text-[11px] text-[#6b7280] text-center">
          {subtitle}
        </p>
      )}

      {price && (
        <p className="mt-2 text-[#436056] font-bold text-sm">₹{price}</p>
      )}

      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-4 w-full rounded-full bg-[#9DC183] text-white text-sm font-semibold py-2 hover:bg-[#436056] transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
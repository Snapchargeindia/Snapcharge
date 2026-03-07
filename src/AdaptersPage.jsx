// src/AdaptersPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { adapterProducts } from "./adapterData";
import { useCart } from "./CartContext";

const AdaptersPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-28 px-4 sm:px-8 lg:px-14 pb-16">
      {/* TOP BAR */}
      <div className="flex flex-col gap-4 mb-10">
        <div>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#436056] text-white text-sm font-medium shadow-[0_6px_14px_rgba(67,96,86,0.25)] hover:bg-[#354c44] transition-all duration-200"
          >
            ← Back to Home
          </button>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-[0.15em] uppercase text-[#3f5c4a]">
            Adapters
          </h1>

          <p className="text-[#6b7f6d] italic text-sm sm:text-base">
            {adapterProducts.length} items
          </p>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {adapterProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/adapters/${product.id}`)}
            className="group cursor-pointer rounded-[30px] bg-[#fffaf2]
            border border-[#e8dcc8]
            shadow-[0_6px_18px_rgba(0,0,0,0.06)]
            hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]
            hover:border-[#7aa874]
            transition-all duration-300
            overflow-hidden flex flex-col"
          >
            {/* IMAGE */}
            <div className="bg-white px-6 pt-6 pb-4 flex-1 flex items-center justify-center">
              {product.images?.length > 0 && product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-52 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="h-52 w-full rounded-2xl border border-dashed border-[#d9cbb5] bg-[#fff6e8] flex items-center justify-center">
                  <p className="text-sm text-[#6b7f6d]">Image coming soon</p>
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div className="px-6 pb-6 pt-3 flex flex-col gap-3">
              <div>
                <h2 className="text-[15px] font-semibold text-[#3f5c4a] leading-snug mb-1 line-clamp-2">
                  {product.name}
                </h2>

                <p className="text-[13px] text-[#6b7f6d] leading-snug line-clamp-2">
                  {product.details}
                </p>
              </div>

              {/* PRICE */}
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-bold text-[#2f4f3e]">
                  ₹{product.price}
                </span>

                <span className="text-[11px] text-gray-400 line-through mt-[2px]">
                  ₹{product.mrp}
                </span>
              </div>

              {/* ADD TO CART */}
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0],
                    subtitle: product.details,
                  });
                }}
                className="mt-3 w-full bg-[#7aa874] hover:bg-[#6b9a65] text-white text-sm font-medium py-2.5 rounded-full shadow-[0_4px_10px_rgba(122,168,116,0.35)] transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdaptersPage;
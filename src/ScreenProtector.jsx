import React from "react";
import { useNavigate } from "react-router-dom";
import { screenProtectorProducts } from "./screenProtectorData";
import { useCart } from "./CartContext";

const ScreenProtector = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const openDetails = (id) => {
    navigate(`/screen-protectors/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-28 px-8 pb-16">
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2.5
          bg-[#436056] text-white text-sm font-medium
          rounded-full shadow hover:bg-[#354c44] transition"
        >
          ← Back to Home
        </button>
      </div>

      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold uppercase text-[#3f5c4a]">
          Screen Protector
        </h1>
        <p className="text-[#6b7f6d] italic">
          {screenProtectorProducts.length} items
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {screenProtectorProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => openDetails(product.id)}
            className="cursor-pointer bg-white rounded-[30px]
            border border-transparent
            hover:border-[#7aa874]
            shadow-md hover:shadow-xl
            transition-all duration-300
            flex flex-col h-[480px]"
          >
            <div className="bg-[#f9f6f1] h-[260px] flex items-center justify-center rounded-t-[30px]">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-[220px] object-contain"
              />
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-md font-semibold text-[#3f5c4a] mb-2">
                  {product.name}
                </h2>
                <p className="text-sm text-[#6b7f6d]">
                  {product.description}
                </p>
              </div>

              <div>
                <p className="text-lg font-bold text-[#2e4034] mt-4">
                  ₹{product.price}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      subtitle: product.description,
                    });
                  }}
                  className="w-full mt-4 bg-[#7aa874]
                  hover:bg-[#6b9a65]
                  text-white py-2 rounded-full
                  transition font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenProtector;
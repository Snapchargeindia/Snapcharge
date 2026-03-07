import React, { useEffect, useState } from "react";
import API_URL from "./api";

const TestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-28 px-6 pb-16">
      <h1 className="text-3xl font-bold text-[#436056] mb-8">
        Backend Test Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-3xl border border-[#e2d5bf] shadow-md p-4"
          >
            <div className="bg-[#f9f6f1] rounded-2xl h-48 flex items-center justify-center mb-4">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-h-40 object-contain"
                />
              ) : (
                <p className="text-sm text-gray-400">No image</p>
              )}
            </div>

            <h2 className="text-lg font-semibold text-[#436056] mb-2">
              {product.name}
            </h2>

            <p className="text-sm text-[#6b7f6d] mb-2">
              {product.description}
            </p>

            <p className="text-lg font-bold text-[#2e4034]">
              ₹{product.price}
            </p>

            <p className="text-sm text-gray-400 line-through">
              ₹{product.mrp}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestProducts;
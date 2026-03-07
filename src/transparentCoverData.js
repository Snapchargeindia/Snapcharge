// src/transparentCoverData.js

import tr1 from "./assets/tr1.png";
import tr2 from "./assets/tr2.png";  
import tr3 from "./assets/tr3.png";
import tr4 from "./assets/tr4.png";
import tr5 from "./assets/tr5.png";
import tr6 from "./assets/tr6.png";
import tr7 from "./assets/tr7.png";
import tr8 from "./assets/tr8.png";
import tr9 from "./assets/tr9.png";


export const transparentCoverProducts = [
  {
    id: 1,
    name: "iPhone Crystal Clear Transparent Case",
    price: 599,
    mrp: 999,
    images: [tr1, tr2, tr3, tr4, tr5],
    details:
      "Crystal clear transparent iPhone case designed to preserve the original look of your device while providing reliable everyday protection from scratches and minor drops.",
    specs: [
      "Ultra clear transparent finish",
      "Anti-yellow long lasting material",
      "Flexible shock absorbing TPU frame",
      "Raised camera & screen protection",
      "Slim lightweight everyday design",
      "Wireless charging compatible",
    ],
    variants: [
      { label: "iPhone 14 Pro Max", price: 599, mrp: 999 },
      { label: "iPhone 14 Pro", price: 599, mrp: 999 },
      { label: "iPhone 14", price: 599, mrp: 999 },
      { label: "iPhone 13 Pro Max", price: 599, mrp: 999 },
      { label: "iPhone 13 Pro", price: 599, mrp: 999 },
      { label: "iPhone 13", price: 599, mrp: 999 },
      { label: "iPhone 12 Pro Max", price: 599, mrp: 999 },
      { label: "iPhone 12 Pro", price: 599, mrp: 999 },
      { label: "iPhone 12", price: 599, mrp: 999 },
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects.",
      care: "Clean with a soft microfiber cloth and avoid harsh chemicals.",
    },
  },
  {
    id: 2,
    name: "iPhone Transparent Shockproof Case",
    price: 649,
    mrp: 1099,
    images: [tr6, tr7, tr8, tr9],
    details:
      "Premium transparent shockproof iPhone case with reinforced corners and crystal clear back. Built to protect your device while keeping its original beauty visible.",
    specs: [
      "Crystal clear transparent back",
      "Shockproof corner protection",
      "Flexible durable TPU frame",
      "Raised camera protection ring",
      "Scratch resistant clear coating",
      "Comfortable slim grip design",
    ],
    variants: [
      { label: "iPhone 14 Pro Max", price: 649, mrp: 1099 },
      { label: "iPhone 14 Pro", price: 649, mrp: 1099 },
      { label: "iPhone 14", price: 649, mrp: 1099 },
      { label: "iPhone 13 Pro Max", price: 649, mrp: 1099 },
      { label: "iPhone 13 Pro", price: 649, mrp: 1099 },
      { label: "iPhone 13", price: 649, mrp: 1099 },
      { label: "iPhone 12 Pro Max", price: 649, mrp: 1099 },
      { label: "iPhone 12 Pro", price: 649, mrp: 1099 },
      { label: "iPhone 12", price: 649, mrp: 1099 },
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects.",
      care: "Use a soft cloth to maintain the transparent finish.",
    },
  },
];

export function getTransparentCoverById(id) {
  const numericId = Number(id);
  return transparentCoverProducts.find((p) => p.id === numericId) || null;
}

export function getRelatedTransparentCovers(currentId) {
  const numericId = Number(currentId);
  return transparentCoverProducts
    .filter((p) => p.id !== numericId)
    .slice(0, 4);
}
// src/metalRingLeatherData.js

import mr1 from "./assets/mr1.png";
import mr2 from "./assets/mr2.png";
import mr3 from "./assets/mr3.png";
import mr4 from "./assets/mr4.png";
import mr5 from "./assets/mr5.png";
import mr6 from "./assets/mr6.png";
import mr7 from "./assets/mr7.png";
import mr8 from "./assets/mr8.png";


export const metalRingLeatherProducts = [
  {
    id: 1,
    name: "Luxury Metal Ring Leather Case",
    price: 1699,
    mrp: 2299,
    images: [mr5, mr2, mr3,mr4,mr1],
    details:
      "Premium leather finish iPhone case with a strong metal ring holder that offers both elegant style and secure grip for daily use.",
    specs: [
      "Premium leather texture finish",
      "Strong 360° metal ring holder",
      "Shock-absorbing protective frame",
      "Raised camera & screen protection",
      "Comfortable anti-slip grip",
      "Premium luxury design",
    ],
    variants: [
      { label: "iPhone 14 Pro Max", price: 1699, mrp: 2299 },
      { label: "iPhone 14 Pro", price: 1699, mrp: 2299 },
      { label: "iPhone 14", price: 1699, mrp: 2299 },
      { label: "iPhone 13 Pro Max", price: 1699, mrp: 2299 },
      { label: "iPhone 13 Pro", price: 1699, mrp: 2299 },
      { label: "iPhone 13", price: 1699, mrp: 2299 },
      { label: "iPhone 12 Pro Max", price: 1699, mrp: 2299 },
      { label: "iPhone 12 Pro", price: 1699, mrp: 2299 },
      { label: "iPhone 12", price: 1699, mrp: 2299 },
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Wipe gently with a soft dry cloth. Avoid water and harsh chemicals.",
    },
  },
  {
    id: 2,
    name: "Classic Ring Holder Leather Case",
    price: 1749,
    mrp: 2399,
    images: [mr6, mr7, mr8],
    details:
      "Elegant leather back case with built-in metal ring support, designed for a classy look, better handling, and everyday phone protection.",
    specs: [
      "Smooth leather-style premium finish",
      "Built-in sturdy metal ring stand",
      "Reinforced corner impact protection",
      "Precise cut-outs for ports and buttons",
      "Raised lip for camera safety",
      "Slim luxury profile with secure grip",
    ],
    variants: [
      { label: "iPhone 14 Pro Max", price: 1749, mrp: 2399 },
      { label: "iPhone 14 Pro", price: 1749, mrp: 2399 },
      { label: "iPhone 14", price: 1749, mrp: 2399 },
      { label: "iPhone 13 Pro Max", price: 1749, mrp: 2399 },
      { label: "iPhone 13 Pro", price: 1749, mrp: 2399 },
      { label: "iPhone 13", price: 1749, mrp: 2399 },
      { label: "iPhone 12 Pro Max", price: 1749, mrp: 2399 },
      { label: "iPhone 12 Pro", price: 1749, mrp: 2399 },
      { label: "iPhone 12", price: 1749, mrp: 2399 },
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Use a soft microfiber cloth for cleaning. Keep away from moisture.",
    },
  },
];

export function getMetalRingLeatherById(id) {
  const numericId = Number(id);
  return metalRingLeatherProducts.find((p) => p.id === numericId) || null;
}

export function getRelatedMetalRingLeather(currentId) {
  const numericId = Number(currentId);
  return metalRingLeatherProducts
    .filter((p) => p.id !== numericId)
    .slice(0, 4);
}
// src/techWovenData.js

import tw1 from "./assets/tw1.png";
import tw2 from "./assets/tw2.png";
import tw3 from "./assets/tw3.png";

import tw4 from "./assets/tw4.png";
import tw5 from "./assets/tw5.png";
import tw6 from "./assets/tw6.png";

import tw7 from "./assets/tw7.png";
import tw8 from "./assets/tw8.png";
import tw9 from "./assets/tw9.png";

import tw10 from "./assets/tw10.png";

const commonVariants = [
  { label: "iPhone 17 Pro Max", price: 1999, mrp: 4900 },
  { label: "iPhone 17 Pro", price: 1999, mrp: 4900 },
];

export const techWovenProducts = [
  {
    id: 1,
    name: "iPhone TechWoven Case with MagSafe",
    colorName: "Purple",
    colorSwatch: "#7c6a92",
    price: 1999,
    mrp: 4900,
    images: [tw1, tw2, tw3],
    details:
      "Premium woven MagSafe case in Purple finish with elegant texture, slim profile and reliable daily protection.",
    specs: [
      "Premium woven texture finish",
      "Built-in MagSafe support",
      "Slim lightweight design",
      "Raised camera and screen edges",
      "Strong daily protection",
      "Smooth button response",
    ],
    colors: [
      { name: "Purple", swatch: "#7c6a92", targetId: 1 },
      { name: "Sienna", swatch: "#a86a41", targetId: 2 },
      { name: "Green", swatch: "#6b8a47", targetId: 3 },
      { name: "Black", swatch: "#4d4d4d", targetId: 4 },
    ],
    variants: commonVariants,
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Clean with a soft dry cloth.",
    },
  },

  {
    id: 2,
    name: "iPhone TechWoven Case with MagSafe",
    colorName: "Sienna",
    colorSwatch: "#a86a41",
    price: 1999,
    mrp: 4900,
    images: [tw4, tw5],
    details:
      "Premium woven MagSafe case in Sienna finish with warm luxury tone, secure grip and stylish everyday protection.",
    specs: [
      "Woven premium fabric texture",
      "Built-in MagSafe compatibility",
      "Anti-slip hand feel",
      "Camera lip protection",
      "Slim body structure",
      "Elegant luxury finish",
    ],
    colors: [
      { name: "Purple", swatch: "#7c6a92", targetId: 1 },
      { name: "Sienna", swatch: "#a86a41", targetId: 2 },
      { name: "Green", swatch: "#6b8a47", targetId: 3 },
      { name: "Black", swatch: "#4d4d4d", targetId: 4 },
    ],
    variants: commonVariants,
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Use a microfiber cloth. Avoid moisture.",
    },
  },

  {
    id: 3,
    name: "iPhone TechWoven Case with MagSafe",
    colorName: "Green",
    colorSwatch: "#6b8a47",
    price: 1999,
    mrp: 4900,
    images: [tw6, tw8, tw7],
    details:
      "Premium woven MagSafe case in Green finish with modern textured look and dependable protection for everyday use.",
    specs: [
      "Premium woven green finish",
      "MagSafe charging support",
      "Shock-resistant protective frame",
      "Raised display protection",
      "Comfortable side grip",
      "Premium modern styling",
    ],
    colors: [
      { name: "Purple", swatch: "#7c6a92", targetId: 1 },
      { name: "Sienna", swatch: "#a86a41", targetId: 2 },
      { name: "Green", swatch: "#6b8a47", targetId: 3 },
      { name: "Black", swatch: "#4d4d4d", targetId: 4 },
    ],
    variants: commonVariants,
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Wipe softly with a dry cloth.",
    },
  },

  {
    id: 4,
    name: "iPhone TechWoven Case with MagSafe",
    colorName: "Black",
    colorSwatch: "#4d4d4d",
    price: 1999,
    mrp: 4900,
    images: [tw9, tw10],
    details:
      "Premium woven MagSafe case in Black finish with timeless minimal look, refined texture and durable all-day protection.",
    specs: [
      "Classic black woven texture",
      "MagSafe ready design",
      "Strong edge protection",
      "Raised camera and screen safety",
      "Slim and lightweight fit",
      "Premium everyday comfort",
    ],
    colors: [
      { name: "Purple", swatch: "#7c6a92", targetId: 1 },
      { name: "Sienna", swatch: "#a86a41", targetId: 2 },
      { name: "Green", swatch: "#6b8a47", targetId: 3 },
      { name: "Black", swatch: "#4d4d4d", targetId: 4 },
    ],
    variants: commonVariants,
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Clean with soft cloth and avoid harsh chemicals.",
    },
  },
];

export function getTechWovenById(id) {
  const numericId = Number(id);
  return techWovenProducts.find((p) => p.id === numericId) || null;
}

export function getRelatedTechWoven(currentId) {
  const numericId = Number(currentId);
  return techWovenProducts.filter((p) => p.id !== numericId).slice(0, 4);
}
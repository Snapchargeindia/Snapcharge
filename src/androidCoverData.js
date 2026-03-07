// src/androidCoverData.js

import an1 from "./assets/an1.png";
import an2 from "./assets/an2.png";
import an3 from "./assets/an3.png";
import an4 from "./assets/an4.png";
import an5 from "./assets/an5.png";

import an6 from "./assets/an6.png";
import an7 from "./assets/an7.png";
import an8 from "./assets/an8.png";

export const androidCoverProducts = [
  {
    id: 1,
    name: "Samsung Galaxy Z Flip5 - Magsafe Transparent Case",
    price: 1199,
    mrp: 1799,

    images: [an6, an7, an8],

    details:
      "Premium transparent MagSafe case for Samsung Galaxy Z Flip5 with crystal-clear finish and strong protection.",

    specs: [
      "Compatible with Samsung Galaxy Z Flip5",
      "MagSafe charging support",
      "Crystal clear transparent back",
      "Slim lightweight design",
      "Raised camera protection",
      "Precise cutouts and button response",
    ],

    variants: [
      {
        label: "Samsung Galaxy Z Flip5",
        price: 1199,
        mrp: 1799,
        images: [an6, an7, an8],
      },
    ],

    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Clean gently with a soft dry cloth.",
    },
  },

  {
    id: 2,
    name: "Samsung Galaxy Z Fold 4 Leather Cover",
    price: 1499,
    mrp: 2199,

    images: [an1, an2, an3],

    details:
      "Premium leather cover for Samsung Galaxy Z Fold 4 with elegant finish and reliable everyday protection.",

    specs: [
      "Compatible with Samsung Galaxy Z Fold 4",
      "Premium leather finish",
      "Slim protective design",
      "Camera and corner protection",
      "Comfortable hand grip",
      "Precise button and port cutouts",
    ],

    variants: [
      {
        label: "Grey",
        price: 1499,
        mrp: 2199,
        images: [an2],
      },
      {
        label: "Green",
        price: 1499,
        mrp: 2199,
        images: [an1],
      },
      {
        label: "Green",
        price: 1499,
        mrp: 2199,
        images: [an1],
      },
      {
        label: "Brown",
        price: 1499,
        mrp: 2199,
        images: [an4],
      },
      {
        label: "White",
        price: 1499,
        mrp: 2199,
        images: [an5],
      },
    ],

    colors: [
      { name: "Grey", hex: "#8a8a8a" },
      { name: "Blue", hex: "#1d1df5" },
      { name: "Green", hex: "#0a8f08" },
      { name: "Pink", hex: "#d09595" },
      { name: "White", hex: "#ffffff", ring: "#e6c437" },
    ],

    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Wipe softly with a dry cloth.",
    },
  },
];

export function getAndroidCoverById(id) {
  return androidCoverProducts.find((p) => p.id === Number(id)) || null;
}

export function getRelatedAndroidCovers(currentId) {
  return androidCoverProducts
    .filter((p) => p.id !== Number(currentId))
    .slice(0, 4);
}
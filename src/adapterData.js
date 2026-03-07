// src/adapterData.js

import ad1 from "./assets/ad1.png";
import ad2 from "./assets/ad2.png";
import ad3 from "./assets/ad3.png";
import ad4 from "./assets/ad4.png";
import ad5 from "./assets/ad5.png";
import ad6 from "./assets/ad6.png";
import ad7 from "./assets/ad7.png";
import ad8 from "./assets/ad8.png";
import ad9 from "./assets/ad9.png";
import ad10 from "./assets/ad10.png";
import ad11 from "./assets/ad11.png";
import ad12 from "./assets/ad12.png";

export const adapterProducts = [
  {
    id: 1,
    name: "20W USB-C Power Adapter",
    price: 899,
    mrp: 1299,
    images: [ad1, ad2, ad3],
    details:
      "Compact 20W USB-C power adapter built for fast and stable charging. Perfect for daily use with smartphones, earbuds and other USB-C supported devices.",
    specs: [
      "20W fast charging output",
      "USB-C power delivery support",
      "Compact and lightweight body",
      "Over-voltage protection",
      "Overheating safety control",
      "Durable premium finish",
    ],
    variants: [
      { label: "20W", price: 899, mrp: 1299 },
      { label: "Single Port", price: 899, mrp: 1299 },
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Use with compatible charging cable and keep away from moisture.",
    },
  },

  {
    id: 2,
    name: "20W C-Type Charger [Adapter + C-to-Lightning Cable]",
    price: 1299,
    mrp: 1799,
    images: [ad4, ad5, ad6],
    details:
      "Complete charging combo with 20W adapter and C-to-Lightning cable for fast, safe and reliable charging of supported devices.",
    specs: [
      "20W quick charge adapter",
      "C-to-Lightning cable included",
      "Efficient power delivery",
      "Smart chip protection",
      "Travel-friendly design",
      "Strong connector durability",
    ],
    variants: [
      { label: "Combo Pack", price: 1299, mrp: 1799 },
      { label: "20W Set", price: 1299, mrp: 1799 },
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Do not bend the cable sharply and unplug carefully after use.",
    },
  },

  {
    id: 3,
    name: "USB-C to Lightning Cable",
    price: 599,
    mrp: 999,
    images: [ad7, ad8, ad9],
    details:
      "Reliable USB-C to Lightning cable made for fast charging and stable data transfer with a durable, long-lasting build.",
    specs: [
      "Fast charging compatible",
      "High-speed data transfer",
      "Strong reinforced ends",
      "Flexible tangle-resistant cable",
      "Stable charging output",
      "Premium quality finish",
    ],
    variants: [
      { label: "1 Meter", price: 599, mrp: 999 },
      { label: "Standard", price: 599, mrp: 999 },
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Avoid pulling from the wire directly; hold from the connector.",
    },
  },

  {
    id: 4,
    name: "60W USB-C Charge Cable (1m)",
    price: 799,
    mrp: 1199,
    images: [ad10, ad11, ad12],
    details:
      "High-performance 60W USB-C charge cable designed for fast charging and dependable use with phones, tablets and supported laptops.",
    specs: [
      "60W fast charging support",
      "USB-C to USB-C interface",
      "1 meter convenient length",
      "Strong and durable cable body",
      "Stable power transmission",
      "Daily heavy-use ready",
    ],
    variants: [
      { label: "60W", price: 799, mrp: 1199 },
      { label: "1 Meter", price: 799, mrp: 1199 },
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Store neatly after use and avoid extreme bending.",
    },
  },
];

export function getAdapterById(id) {
  return adapterProducts.find((p) => p.id === Number(id)) || null;
}

export function getRelatedAdapters(currentId) {
  return adapterProducts
    .filter((p) => p.id !== Number(currentId))
    .slice(0, 4);
}
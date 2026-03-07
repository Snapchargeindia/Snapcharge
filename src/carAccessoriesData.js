// src/carAccessoriesData.js

import car1 from "./assets/car1.png";
import car2 from "./assets/car2.png";
import car3 from "./assets/car3.png";
import car4 from "./assets/car4.png";
import car5 from "./assets/car5.png";
import car6 from "./assets/car6.png";
import car7 from "./assets/car7.png";
import car8 from "./assets/car8.png";
import car9 from "./assets/car9.png";
import car10 from "./assets/car10.png";
import car11 from "./assets/car11.png";
import car12 from "./assets/car12.png";
import car13 from "./assets/car13.png";
import car14 from "./assets/car14.png";
import car15 from "./assets/car15.png";
import car16 from "./assets/car16.png";
import car17 from "./assets/car17.png";
import car18 from "./assets/car18.png";
import car19 from "./assets/car19.png";

export const carAccessoryProducts = [
  {
    id: 1,
    name: "Vacuum Suction Magnetic Phone Mount 360°",
    price: 799,
    mrp: 1299,
    images: [car1, car2, car3],
    details:
      "Strong vacuum suction magnetic phone mount with 360° rotation for safe and stable phone positioning while driving.",
    specs: [
      "360° adjustable viewing angle",
      "Strong magnetic hold",
      "Vacuum suction base",
      "Stable dashboard mounting",
      "Compact and durable design",
      "Easy installation",
    ],
    variants: [{ label: "Standard", price: 799, mrp: 1299 }],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Keep dry and clean gently with a soft cloth.",
    },
  },

  {
    id: 2,
    name: "125W Max Fast Car Charger - 2 Ports",
    price: 899,
    mrp: 1399,
    images: [car4, car5, car6],
    details:
      "High power 125W fast car charger with dual ports designed for rapid charging of smartphones and other devices.",
    specs: [
      "125W max fast charging",
      "Dual charging ports",
      "Smart power distribution",
      "Compact metal design",
      "Overheat protection",
      "Stable car socket fit",
    ],
    variants: [{ label: "2 Ports", price: 899, mrp: 1399 }],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Avoid moisture and clean gently.",
    },
  },

  {
    id: 3,
    name: "30W Mini Max Fast Car Charger - 2 Ports",
    price: 749,
    mrp: 1199,
    images: [car7, car7, car7],
    details:
      "Compact 30W mini fast charger designed for quick and efficient charging inside your car.",
    specs: [
      "30W fast charging support",
      "Dual USB ports",
      "Mini compact design",
      "Smart protection system",
      "Durable build quality",
      "Universal compatibility",
    ],
    variants: [{ label: "Mini Charger", price: 749, mrp: 1199 }],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Use properly fitted charging cables.",
    },
  },

  {
    id: 4,
    name: "100W Max Fast Car Charger - 3 Ports",
    price: 999,
    mrp: 1499,
    images: [car8, car9, car10],
    details:
      "Powerful 100W fast car charger with triple port design allowing simultaneous charging of multiple devices.",
    specs: [
      "100W high power charging",
      "3 charging ports",
      "Smart power control",
      "Durable aluminum body",
      "Safe charging protection",
      "Compact design",
    ],
    variants: [{ label: "3 Ports", price: 999, mrp: 1499 }],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Avoid extreme heat while using.",
    },
  },

  {
    id: 5,
    name: "Smart Car Charger Bluetooth MP3 + 2 Port Charging with Light",
    price: 1099,
    mrp: 1599,
    images: [car11, car12, car13],
    details:
      "Smart Bluetooth car charger with MP3 playback, LED lighting and dual USB charging ports.",
    specs: [
      "Bluetooth music streaming",
      "MP3 playback support",
      "Dual USB charging ports",
      "LED lighting effect",
      "Hands-free calling support",
      "Easy car installation",
    ],
    variants: [{ label: "Bluetooth MP3", price: 1099, mrp: 1599 }],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Keep device dry and avoid dust.",
    },
  },

  {
    id: 6,
    name: "15W Magnetic Wireless Car Air Vent Charger",
    price: 1199,
    mrp: 1699,
    images: [car14, car17, car16],
    details:
      "15W magnetic wireless charger designed for car air vents with strong magnetic alignment and stable charging.",
    specs: [
      "15W wireless charging",
      "Magnetic phone alignment",
      "Air vent mounting design",
      "Strong magnetic hold",
      "Fast charging support",
      "Stable driving use",
    ],
    variants: [{ label: "Wireless Magnetic", price: 1199, mrp: 1699 }],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Avoid metal objects near charger.",
    },
  },

  {
    id: 7,
    name: "VoltX Wireless CarPlay Metal Adapter with BT 5.3 & WIFI 5.8Ghz",
    price: 2499,
    mrp: 3299,
    images: [car15, car18, car19],
    details:
      "Wireless CarPlay adapter with BT 5.3 and high speed 5.8GHz WiFi for seamless wireless Apple CarPlay connection.",
    specs: [
      "Wireless Apple CarPlay support",
      "Bluetooth 5.3 connection",
      "5.8GHz high speed WiFi",
      "Metal premium body",
      "Plug and play setup",
      "Stable connection performance",
    ],
    variants: [{ label: "CarPlay Adapter", price: 2499, mrp: 3299 }],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Keep adapter clean and dry.",
    },
  },
];

export function getCarAccessoryById(id) {
  return carAccessoryProducts.find((p) => p.id === Number(id)) || null;
}

export function getRelatedCarAccessories(currentId) {
  return carAccessoryProducts
    .filter((p) => p.id !== Number(currentId))
    .slice(0, 4);
}
// src/fineWovenMagsafeData.js

import fw1 from "./assets/fw1.png";
import fw2 from "./assets/fw2.png";
import fw3 from "./assets/fw3.png";
import fw4 from "./assets/fw4.png";
import fw5 from "./assets/fw5.png";
import fw6 from "./assets/fw6.png";
import fw7 from "./assets/fw7.png";
import fw8 from "./assets/fw8.png";
import fw9 from "./assets/fw9.png";
import fw10 from "./assets/fw10.png";
import fw11 from "./assets/fw11.png";
import fw12 from "./assets/fw12.png";
import fw13 from "./assets/fw13.png";
import fw14 from "./assets/fw14.png";
import fw15 from "./assets/fw15.png";

const variants = [
  { label: "iPhone 15 Pro Max", price: 1299, mrp: 1999 },
  { label: "iPhone 15 Pro", price: 1299, mrp: 1999 },
  { label: "iPhone 15", price: 1299, mrp: 1999 },
];

export const fineWovenMagsafeProducts = [
  {
    id: 1,
    name: "FineWoven Case with MagSafe - Taupe",
    price: 1299,
    mrp: 1999,
    images: [fw1, fw2, fw3],
    details:
      "Premium FineWoven MagSafe case with soft fabric texture and elegant finish. Designed for slim profile and reliable protection.",
    specs: [
      "Premium FineWoven texture",
      "MagSafe compatible magnets",
      "Slim lightweight design",
      "Raised camera protection",
      "Soft grip surface",
      "Scratch resistant finish",
    ],
    variants,
  },

  {
    id: 2,
    name: "FineWoven Case with MagSafe - Black",
    price: 1349,
    mrp: 2049,
    images: [fw4, fw5, fw6],
    details:
      "Classic FineWoven MagSafe compatible case offering minimal design with comfortable grip and strong device protection.",
    specs: [
      "Soft woven texture",
      "MagSafe magnetic support",
      "Slim pocket friendly design",
      "Durable protective frame",
      "Camera lip protection",
      "Premium finish surface",
    ],
    variants,
  },

  {
    id: 3,
    name: "FineWoven Case with MagSafe - Pacific Blue",
    price: 1399,
    mrp: 2099,
    images: [fw7, fw8, fw9],
    details:
      "Luxury FineWoven MagSafe case built with premium woven surface and reliable daily protection.",
    specs: [
      "Luxury woven finish",
      "MagSafe charging support",
      "Shock resistant structure",
      "Slim protective design",
      "Raised screen protection",
      "Smooth button feedback",
    ],
    variants,
  },

  {
    id: 4,
    name: "FineWoven Case with MagSafe - Mulberry",
    price: 1449,
    mrp: 2149,
    images: [fw10, fw11, fw12],
    details:
      "Modern FineWoven case with minimal aesthetic and comfortable grip built for everyday protection.",
    specs: [
      "Modern woven material",
      "MagSafe ready magnets",
      "Slim lightweight body",
      "Scratch resistant texture",
      "Premium feel finish",
      "Camera safety lip",
    ],
    variants,
  },

  {
    id: 5,
    name: "FineWoven Case with MagSafe - Evergreen",
    price: 1499,
    mrp: 2199,
    images: [fw13, fw14, fw15],
    details:
      "Luxury FineWoven MagSafe case designed with premium materials and stylish minimal finish.",
    specs: [
      "Premium woven surface",
      "MagSafe compatible design",
      "Shock absorbing frame",
      "Slim ergonomic design",
      "Soft grip texture",
      "Long lasting finish",
    ],
    variants,
  },
];

export function getFineWovenMagsafeById(id) {
  return fineWovenMagsafeProducts.find((p) => p.id === Number(id)) || null;
}

export function getRelatedFineWovenMagsafe(currentId) {
  return fineWovenMagsafeProducts
    .filter((p) => p.id !== Number(currentId))
    .slice(0, 4);
}
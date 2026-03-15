import React from "react";
import { Link } from "react-router-dom";

/* ===== CATEGORY IMAGES ===== */
import catPremium from "./assets/categories/premium.png";
import catCamera from "./assets/categories/camera.png";
import catSilicone from "./assets/categories/silicone.png";
import catTechWoven from "./assets/categories/woven.png";
import catCrossBody from "./assets/categories/crossbody.png";
import catFineWovenMag from "./assets/categories/finewoven.png";
import catTransparentCovers from "./assets/categories/transparent.png";
import catAndroid from "./assets/categories/android.png";
import catScreen from "./assets/categories/screen.png";
import catWatchStraps from "./assets/categories/watchstraps.png";
import catWatchCases from "./assets/categories/watchcases.png";
import catWatchChargers from "./assets/categories/watchchargers.png";
import catAdapters from "./assets/categories/adapters.png";
import catCables from "./assets/categories/cables.png";
import catLaptop from "./assets/categories/laptop.png";
import catTransparentAccessories from "./assets/categories/clearaccessories.png";
import catCar from "./assets/categories/car.png";
import catPowerbank from "./assets/categories/powerbank.png";
import catWirelessCharging from "./assets/categories/wireless.png";

const categories = [
  { title: "CAMERA LENS", img: catCamera, to: "/premium-covers" },
  { title: "PREMIUM COVERS", img: catPremium, to: "/premium-covers" },
  { title: "SILICONE COVERS", img: catSilicone, to: "/silicone-covers" },
  { title: "TECH WOVEN", img: catTechWoven, to: "/tech-woven" },
  { title: "CROSS BODY STRAPS", img: catCrossBody, to: "/crossbody-straps" },
  { title: "FINE WOVEN MAGSAFE", img: catFineWovenMag, to: "/fine-woven-magsafe" },
  { title: "TRANSPARENT COVERS", img: catTransparentCovers, to: "/transparent-covers" },
  { title: "ANDROID COVERS", img: catAndroid, to: "/android-covers" },
  { title: "SCREEN PROTECTOR", img: catScreen, to: "/screen-protectors" },
  { title: "WATCH STRAPS", img: catWatchStraps, to: "/watch-straps" },
  { title: "WATCH CASES", img: catWatchCases, to: "/watch-cases" },
  { title: "WATCH CHARGERS", img: catWatchChargers, to: "/watch-chargers" },
  { title: "ADAPTERS", img: catAdapters, to: "/adapters" },
  { title: "CHARGING CABLES", img: catCables, to: "/adapters" },
  { title: "LAPTOP ACCESSORIES", img: catLaptop, to: "/laptop-accessories" },
  { title: "TRAVEL ACCESSORIES", img: catTransparentAccessories, to: "/wireless-accessories" },
  { title: "CAR ACCESSORIES", img: catCar, to: "/car-accessories" },
  { title: "POWER BANK", img: catPowerbank, to: "/power-bank" },
  { title: "WIRELESS CHARGING", img: catWirelessCharging, to: "/wireless-accessories" },
];

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Premium Covers", to: "/premium-covers" },
  { label: "Silicone Covers", to: "/silicone-covers" },
  { label: "Screen Protector", to: "/screen-protectors" },
  { label: "Watch Straps", to: "/watch-straps" },
  { label: "Charging Accessories", to: "/adapters" },
];

const Footer = () => {
  return (
    <footer className="mt-20 bg-[#2f3e38] text-white overflow-hidden">
      {/* ================= TOP ================= */}
      <div className="w-[94%] max-w-7xl mx-auto pt-14 pb-10 border-b border-white/10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#cfe4c3] font-semibold">
              Snapcharge Footer
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
              Premium accessories for
              <br />
              every device setup
            </h2>
            <p className="mt-5 text-white/70 leading-8 max-w-2xl">
              Explore premium covers, watch essentials, charging gear and more
              in one clean shopping experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to="/premium-covers"
              className="rounded-[24px] bg-white/6 border border-white/10 p-5 hover:bg-white/10 transition"
            >
              <h3 className="text-lg font-semibold">Premium Look</h3>
              <p className="mt-2 text-sm text-white/70 leading-6">
                Clean design with better materials and refined styling.
              </p>
            </Link>

            <Link
              to="/adapters"
              className="rounded-[24px] bg-white/6 border border-white/10 p-5 hover:bg-white/10 transition"
            >
              <h3 className="text-lg font-semibold">Daily Utility</h3>
              <p className="mt-2 text-sm text-white/70 leading-6">
                Accessories built for everyday protection and charging.
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= CATEGORIES ================= */}
      <div className="w-[94%] max-w-7xl mx-auto py-14">
        <div className="text-center">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#cfe4c3] font-semibold">
            Shop By Category
          </p>
          <h3 className="mt-3 text-3xl md:text-4xl font-bold">
            ALL CATEGORIES
          </h3>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-6">
          {categories.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="group cursor-pointer text-center"
            >
              <div className="mx-auto w-[138px] h-[138px] rounded-full bg-white/8 border border-white/10 flex items-center justify-center transition duration-300 group-hover:scale-105 group-hover:bg-white/12">
                <div className="w-[106px] h-[106px] rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain transition duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              <h4 className="mt-4 text-[12px] md:text-[13px] font-bold tracking-wide text-white leading-tight px-2">
                {item.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= CTA UNDER CATEGORIES ================= */}
      <div className="w-[94%] max-w-7xl mx-auto pb-14">
        <div className="relative overflow-hidden rounded-[38px] bg-[#24312c] px-7 sm:px-10 md:px-14 py-12 md:py-16 text-center shadow-[0_25px_75px_rgba(0,0,0,0.18)] border border-white/10">
          <div className="absolute -top-16 right-10 h-40 w-40 rounded-full bg-[#9DC18322] blur-3xl" />
          <div className="absolute -bottom-10 left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white">
              Find accessories that match
              <br />
              your device and your vibe
            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-white/75 leading-8">
              Explore premium covers, watch essentials, charging accessories and
              more in one polished shopping experience.
            </p>

            <Link
              to="/premium-covers"
              className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#9DC183] text-white font-semibold hover:bg-white hover:text-[#2f3e38] transition"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="border-t border-white/10">
        <div className="w-[94%] max-w-7xl mx-auto py-12 grid md:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="text-2xl font-bold text-[#9DC183]">
              SNAPCHARGE
            </Link>
            <p className="mt-4 text-white/70 leading-7 max-w-sm">
              Premium phone covers, watch accessories and charging essentials
              designed for style, protection and everyday convenience.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-3 text-white/70">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="hover:text-[#9DC183] transition cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="mt-4 space-y-3 text-white/70 leading-7">
              <p>
                Phone:{" "}
                <a
                  href="tel:+917817888055"
                  className="hover:text-[#9DC183] transition"
                >
                  +91 7817888055
                </a>
              </p>

              <p>
                Email:{" "}
                <a
                  href="mailto:snapchargeindia@gmail.com"
                  className="hover:text-[#9DC183] transition"
                >
                  snapchargeindia@gmail.com
                </a>
              </p>

              <p>24*7 customer support available</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="border-t border-white/10">
        <div className="w-[94%] max-w-7xl mx-auto py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/55">
          <p>© 2026 SNAPCHARGE. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
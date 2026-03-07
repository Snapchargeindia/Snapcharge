import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ===== MAIN IMAGES ===== */
import wirelessHeroImg from "./assets/wireless.png";
import protectionImg from "./assets/image1.png";
import watchStrapsImg from "./assets/watchstraps.png";
import chargerImg from "./assets/charger.png";
import iphoneCasesImg from "./assets/iphonecases.png";
import screenProtectorImg from "./assets/screenprotector.png";
import watchCaseVideo from "./assets/watchcase.mp4";
import carMultiChargerImg from "./assets/carcharger.png";

const categoryStrip = [
  { label: "Premium Covers", to: "/premium-covers" },
  { label: "Watch Straps", to: "/watch-straps" },
  { label: "Wireless Charging", to: "/wireless-accessories" },
  { label: "Screen Protector", to: "/screen-protectors" },
  { label: "Adapters", to: "/adapters" },
  { label: "Car Accessories", to: "/car-accessories" },
];

const featureCards = [
  {
    no: "01",
    title: "Refined Materials",
    desc: "Smooth textures, better grip and premium finishes that feel elevated in hand.",
  },
  {
    no: "02",
    title: "Built To Protect",
    desc: "Made for daily drops, scratches and all the little moments in between.",
  },
  {
    no: "03",
    title: "Charging That Lasts",
    desc: "Reliable cables, adapters and wireless gear for fast everyday power.",
  },
  {
    no: "04",
    title: "Styled For Modern Use",
    desc: "A balance of function and design so your accessories never look basic.",
  },
];

const spotlightCards = [
  {
    title: "Silicone Covers",
    desc: "Soft-touch protection in wearable colors.",
    img: iphoneCasesImg,
    to: "/silicone-covers",
  },
  {
    title: "Watch Essentials",
    desc: "Straps, cases and chargers for your Apple Watch.",
    img: watchStrapsImg,
    to: "/watch-straps",
  },
  {
    title: "Charging Setup",
    desc: "Cables, adapters and power accessories built for speed.",
    img: chargerImg,
    to: "/adapters",
  },
];

const smoothEase = [0.22, 1, 0.36, 1];

const riseUp = {
  hidden: {
    opacity: 0,
    y: 90,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: smoothEase,
    },
  },
};

const riseUpSoft = {
  hidden: {
    opacity: 0,
    y: 55,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

const riseLeft = {
  hidden: {
    opacity: 0,
    x: -70,
    y: 40,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: smoothEase,
    },
  },
};

const riseRight = {
  hidden: {
    opacity: 0,
    x: 70,
    y: 40,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: smoothEase,
    },
  },
};

const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const cardStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const zoomRise = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 50,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

const floatSlow = {
  y: [0, -14, 0],
  transition: {
    duration: 4.8,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const floatSoft = {
  y: [0, -8, 0],
  transition: {
    duration: 3.8,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const Home = () => {
  return (
    <main className="min-h-screen bg-[#FAEBD7] pt-[128px] pb-16 text-[#2f3e38] overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="w-[94%] max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerParent}
          className="relative overflow-hidden rounded-[38px] bg-gradient-to-br from-[#fff8ef] via-[#f6efe5] to-[#f0e4d2] border border-[#eadcca] shadow-[0_25px_70px_rgba(67,96,86,0.10)]"
        >
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.22, 0.34, 0.22],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#9DC18322] blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.14, 0.24, 0.14],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-[#43605614] blur-3xl"
          />

          <div className="relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
            <motion.div variants={riseLeft}>
              <motion.span
                variants={riseUpSoft}
                className="inline-flex items-center rounded-full border border-[#d9ccb8] bg-white/70 backdrop-blur px-4 py-2 text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#436056] uppercase"
              >
                Premium Tech Accessories
              </motion.span>

              <motion.h1
                variants={riseUp}
                className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.98] tracking-[-0.03em] text-[#26342f]"
              >
                Power Your
                <br />
                Style With
                <br />
                <span className="text-[#9DC183]">SNAPCHARGE</span>
              </motion.h1>

              <motion.p
                variants={riseUpSoft}
                className="mt-6 max-w-xl text-base md:text-lg leading-8 text-[#436056]"
              >
                Premium phone covers, watch accessories and charging solutions
                designed to look clean, feel refined and perform daily.
              </motion.p>

              <motion.div
                variants={riseUpSoft}
                className="mt-8 flex flex-wrap gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    to="/premium-covers"
                    className="px-8 py-3 rounded-full bg-[#2f3e38] text-white font-semibold hover:bg-[#9DC183] transition duration-300 inline-block shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
                  >
                    Shop Now
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    to="/silicone-covers"
                    className="px-8 py-3 rounded-full border border-[#436056] text-[#436056] font-semibold hover:bg-[#436056] hover:text-white transition duration-300 inline-block"
                  >
                    Explore More
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                variants={cardStagger}
                className="mt-10 grid grid-cols-3 gap-3 max-w-xl"
              >
                {[
                  { title: "19+", text: "Categories" },
                  { title: "Fast", text: "Charging Gear" },
                  { title: "Daily", text: "Protection" },
                ].map((item) => (
                  <motion.div
                    key={item.text}
                    variants={zoomRise}
                    whileHover={{ y: -8, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 180, damping: 16 }}
                    className="rounded-[22px] bg-white/75 backdrop-blur px-4 py-4 shadow-sm border border-[#efe3d3]"
                  >
                    <h3 className="text-2xl font-bold text-[#2f3e38]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#436056]">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={riseRight}
              className="relative flex justify-center lg:justify-end"
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.24, 0.34, 0.24],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute h-[320px] w-[320px] md:h-[430px] md:w-[430px] rounded-full bg-[#9DC18330] blur-3xl"
              />
              <motion.div
                animate={floatSlow}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative w-full max-w-[560px] rounded-[34px] bg-white/45 backdrop-blur-md border border-white/40 p-4 sm:p-6 shadow-[0_35px_80px_rgba(0,0,0,0.14)]"
              >
                <img
                  src={wirelessHeroImg}
                  alt="Wireless hero"
                  className="w-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.18)]"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ================= CATEGORY STRIP ================= */}
      <motion.section
        className="w-[94%] max-w-7xl mx-auto mt-7"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.12 }}
        variants={riseUp}
      >
        <div className="rounded-[26px] bg-white/70 backdrop-blur px-4 md:px-6 py-5 border border-[#eadccc] shadow-sm">
          <motion.div
            variants={cardStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.12 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categoryStrip.map((item, i) => (
              <motion.div
                key={i}
                variants={zoomRise}
                whileHover={{ y: -4, scale: 1.04 }}
              >
                <Link
                  to={item.to}
                  className="px-4 py-2 rounded-full bg-[#FAEBD7] border border-[#e6d8c7] text-[#436056] text-sm font-medium hover:bg-[#9DC183] hover:text-white hover:border-[#9DC183] transition"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ================= BIG IMAGE OVERLAY ================= */}
      <motion.section
        className="mt-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.12 }}
        variants={zoomRise}
      >
        <div className="relative w-[94%] max-w-7xl mx-auto h-[72vh] md:h-[84vh] rounded-[40px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
          <motion.img
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.1, ease: smoothEase }}
            viewport={{ once: false, amount: 0.12 }}
            src={screenProtectorImg}
            alt="Screen protector"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.12 }}
            variants={staggerParent}
            className="relative z-10 h-full flex items-center px-7 sm:px-10 md:px-16"
          >
            <div className="max-w-2xl text-white">
              <motion.span
                variants={riseUpSoft}
                className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs sm:text-sm tracking-[0.22em] uppercase"
              >
                Minimal. Strong. Premium.
              </motion.span>

              <motion.h2
                variants={riseUp}
                className="mt-6 text-4xl md:text-6xl font-black leading-[1.03] tracking-[-0.03em]"
              >
                Accessories that
                <br />
                protect your device
                <br />
                and upgrade the vibe
              </motion.h2>

              <motion.p
                variants={riseUpSoft}
                className="mt-5 text-base md:text-lg text-white/85 leading-8 max-w-xl"
              >
                Discover better materials, cleaner aesthetics and everyday
                essentials made to feel premium from every angle.
              </motion.p>

              <motion.div
                variants={riseUpSoft}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/screen-protectors"
                  className="mt-8 inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-[#2f3e38] font-semibold hover:bg-[#9DC183] hover:text-white transition duration-300"
                >
                  Shop Protection
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= EDITORIAL SECTION ================= */}
      <motion.section
        className="w-[94%] max-w-7xl mx-auto mt-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.12 }}
      >
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-8 items-stretch">
          <motion.div
            variants={riseLeft}
            className="rounded-[34px] bg-white border border-[#ede0cf] p-7 md:p-10 shadow-[0_20px_55px_rgba(0,0,0,0.06)] flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#7e9d72] uppercase">
                Everyday Protection
              </span>

              <h2 className="mt-4 text-3xl md:text-4xl font-bold leading-tight text-[#2f3e38]">
                Cases that feel slim
                <br />
                but protect hard
              </h2>

              <p className="mt-5 text-[#46524d] leading-8 text-base md:text-lg">
                Smooth in hand, polished in look and built to guard against the
                everyday. Protection should never feel bulky or boring.
              </p>

              <ul className="mt-6 space-y-3 text-[#46524d]">
                <li>• Soft-touch anti-fingerprint finish</li>
                <li>• Raised screen and camera edges</li>
                <li>• Lightweight impact-ready design</li>
                <li>• Premium fit with clean detailing</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to="/premium-covers"
                  className="px-7 py-3 rounded-full bg-[#436056] text-white font-semibold hover:bg-[#9DC183] transition inline-block"
                >
                  Discover Covers
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to="/transparent-covers"
                  className="px-7 py-3 rounded-full border border-[#436056] text-[#436056] font-semibold hover:bg-[#436056] hover:text-white transition inline-block"
                >
                  View Details
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={riseRight}
            whileHover={{ y: -8 }}
            className="relative rounded-[34px] overflow-hidden bg-[#f3e8d9] min-h-[420px] shadow-[0_20px_55px_rgba(0,0,0,0.08)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff60] to-transparent" />
            <motion.img
              animate={floatSoft}
              src={protectionImg}
              alt="Protection"
              className="absolute inset-0 w-full h-full object-contain p-8 md:p-10"
            />

            <div className="absolute bottom-5 left-5 right-5">
              <div className="rounded-[24px] bg-white/75 backdrop-blur-md border border-white/50 px-5 py-4 shadow-lg">
                <p className="text-sm md:text-base text-[#436056]">
                  Made for everyday style with a more refined, protective feel.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= WATCH STRAPS ================= */}
      <motion.section
        className="w-[94%] max-w-7xl mx-auto mt-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.12 }}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={riseLeft}
            whileHover={{ y: -8 }}
            className="relative rounded-[34px] bg-gradient-to-br from-[#eef5e8] to-[#f6eee3] border border-[#e7dccb] min-h-[420px] overflow-hidden shadow-[0_20px_55px_rgba(0,0,0,0.06)]"
          >
            <motion.img
              animate={floatSoft}
              src={watchStrapsImg}
              alt="Watch straps"
              className="absolute inset-0 w-full h-full object-contain p-8 md:p-10"
            />
          </motion.div>

          <motion.div variants={riseRight} className="px-1 md:px-6">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#7e9d72] uppercase">
              Apple Watch Straps
            </span>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-[#2f3e38]">
              Designed for comfort.
              <br />
              Styled for every day.
            </h2>

            <p className="mt-5 text-[#46524d] leading-8 text-base md:text-lg max-w-xl">
              Comfortable all-day straps that move from casual wear to work mode
              with ease. Clean design, better fit and a polished wrist setup.
            </p>

            <motion.div
              variants={cardStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.12 }}
              className="mt-8 grid sm:grid-cols-2 gap-4 max-w-xl"
            >
              {[
                { t: "Comfort Fit", d: "Light, flexible and easy for daily wear." },
                {
                  t: "Clean Finish",
                  d: "A polished look that feels minimal and premium.",
                },
              ].map((card) => (
                <motion.div
                  key={card.t}
                  variants={zoomRise}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 180, damping: 16 }}
                  className="rounded-[24px] bg-white p-5 border border-[#efe3d3] shadow-sm"
                >
                  <h3 className="font-semibold text-[#2f3e38]">{card.t}</h3>
                  <p className="mt-2 text-sm text-[#436056] leading-6">
                    {card.d}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to="/watch-straps"
                  className="px-7 py-3 rounded-full bg-[#2f3e38] text-white font-semibold hover:bg-[#9DC183] transition duration-300 inline-block"
                >
                  Shop Watch Straps
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to="/watch-cases"
                  className="px-7 py-3 rounded-full border border-[#436056] text-[#436056] font-semibold hover:bg-[#436056] hover:text-white transition duration-300 inline-block"
                >
                  Explore Styles
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= VIDEO SECTION ================= */}
      <motion.section
        className="mt-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.12 }}
        variants={zoomRise}
      >
        <div className="w-[94%] max-w-7xl mx-auto rounded-[40px] overflow-hidden bg-[#2f3e38] shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] items-stretch">
            <motion.div
              variants={riseLeft}
              className="px-8 md:px-12 py-12 md:py-16 text-white flex flex-col justify-center"
            >
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#c7dfb8] uppercase">
                Watch Case Protection
              </span>

              <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                Style That
                <br />
                <span className="text-[#9DC183]">Truly Shields</span>
              </h2>

              <p className="mt-5 text-white/75 leading-8 text-base md:text-lg max-w-lg">
                Precision-fit watch cases that protect your edges and crown
                while keeping the overall look sleek, sharp and premium.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Precision Fit", "Sleek Finish", "Edge Protection"].map(
                  (tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ y: -4, scale: 1.04 }}
                      className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm"
                    >
                      {tag}
                    </motion.span>
                  )
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    to="/watch-cases"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#9DC183] text-white font-semibold hover:bg-white hover:text-[#2f3e38] transition duration-300"
                  >
                    Shop Watch Cases
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    to="/watch-chargers"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-white/25 text-white font-semibold hover:bg-white hover:text-[#2f3e38] transition duration-300"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={riseRight}
              className="relative min-h-[350px] md:min-h-[460px]"
            >
              <motion.video
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: false, amount: 0.12 }}
                src={watchCaseVideo}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ================= FEATURE GRID ================= */}
      <motion.section
        className="w-[94%] max-w-7xl mx-auto mt-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.12 }}
      >
        <motion.div variants={riseUp} className="text-center">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#7e9d72] uppercase">
            Why Choose Snapcharge
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#2f3e38]">
            Better materials. Better detailing. Better everyday use.
          </h2>
        </motion.div>

        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.12 }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featureCards.map((item) => (
            <motion.div
              key={item.no}
              variants={zoomRise}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
              className="group rounded-[28px] bg-white border border-[#eee1d0] p-6 shadow-sm hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#9DC18322] flex items-center justify-center text-[#436056] font-bold">
                {item.no}
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#2f3e38]">
                {item.title}
              </h3>
              <p className="mt-3 text-[#436056] leading-7 text-sm md:text-base">
                {item.desc}
              </p>
              <Link
                to="/premium-covers"
                className="mt-6 inline-block text-[#436056] font-semibold hover:text-[#9DC183] transition"
              >
                Read More →
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={riseUpSoft} className="mt-10 text-center">
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-block"
          >
            <Link
              to="/premium-covers"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#2f3e38] text-white font-semibold hover:bg-[#9DC183] transition duration-300"
            >
              Why Shop With Us
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ================= CHARGING SECTION ================= */}
      <motion.section
        className="w-[94%] max-w-7xl mx-auto mt-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.12 }}
      >
        <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-8 items-center">
          <motion.div
            variants={riseLeft}
            whileHover={{ y: -8 }}
            className="relative rounded-[36px] overflow-hidden bg-white border border-[#ece0cf] shadow-[0_25px_65px_rgba(0,0,0,0.06)] min-h-[440px]"
          >
            <motion.img
              animate={floatSoft}
              src={chargerImg}
              alt="Charging"
              className="absolute inset-0 w-full h-full object-contain p-8 md:p-10"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              viewport={{ once: false, amount: 0.12 }}
              className="absolute left-5 right-5 bottom-5 md:right-auto md:w-[280px]"
            >
              <div className="rounded-[24px] bg-[#2f3e38] text-white p-5 shadow-xl">
                <h3 className="text-lg font-semibold">Fast & Safe Charging</h3>
                <p className="mt-2 text-sm text-white/75 leading-6">
                  Daily charging essentials with durable build and cleaner
                  design.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={riseRight} className="px-1 md:px-6">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#7e9d72] uppercase">
              Charging Solutions
            </span>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-[#2f3e38]">
              Fast power for
              <br />
              every setup
            </h2>

            <p className="mt-5 text-[#46524d] leading-8 text-base md:text-lg max-w-xl">
              Chargers, cables and adapters made for work desks, travel bags and
              everyday carry — all with a premium and reliable feel.
            </p>

            <motion.div
              variants={cardStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.12 }}
              className="mt-8 space-y-4 max-w-xl"
            >
              {[
                "Durable cable and adapter quality",
                "Safer everyday charging performance",
                "Compact and travel-friendly accessories",
              ].map((text) => (
                <motion.div
                  key={text}
                  variants={zoomRise}
                  whileHover={{ x: 8 }}
                  className="rounded-[22px] bg-white border border-[#efe2d2] px-5 py-4 shadow-sm"
                >
                  {text}
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to="/adapters"
                  className="px-7 py-3 rounded-full bg-[#2f3e38] text-white font-semibold hover:bg-[#9DC183] transition duration-300 inline-block"
                >
                  Shop Charging
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to="/wireless-accessories"
                  className="px-7 py-3 rounded-full border border-[#436056] text-[#436056] font-semibold hover:bg-[#436056] hover:text-white transition duration-300 inline-block"
                >
                  View Accessories
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= CAR ACCESSORIES ================= */}
      <motion.section
        className="mt-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.12 }}
        variants={zoomRise}
      >
        <div className="w-[94%] max-w-7xl mx-auto relative rounded-[40px] overflow-hidden min-h-[430px] shadow-[0_25px_80px_rgba(0,0,0,0.10)]">
          <motion.img
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.1 }}
            viewport={{ once: false, amount: 0.12 }}
            src={carMultiChargerImg}
            alt="Car accessories"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f2925]/80 via-[#1f2925]/40 to-transparent" />

          <motion.div
            variants={riseLeft}
            className="relative z-10 h-full flex items-center px-7 sm:px-10 md:px-16 py-12"
          >
            <div className="max-w-xl text-white">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#d1e6c5] uppercase">
                Car Accessories
              </span>

              <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                Stay Charged
                <br />
                On Every Drive
              </h2>

              <p className="mt-5 text-white/80 text-base md:text-lg leading-8">
                Compact car charging accessories that keep navigation, music and
                battery life moving with you.
              </p>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to="/car-accessories"
                  className="mt-8 inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#9DC183] text-white font-semibold hover:bg-white hover:text-[#2f3e38] transition duration-300"
                >
                  Shop Car Accessories
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= SPOTLIGHT CARDS ================= */}
      <motion.section
        className="w-[94%] max-w-7xl mx-auto mt-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.12 }}
      >
        <motion.div variants={riseUp} className="text-center">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#7e9d72] uppercase">
            Featured Picks
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#2f3e38]">
            Essentials worth spotlighting
          </h2>
        </motion.div>

        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.12 }}
          className="mt-12 grid md:grid-cols-3 gap-7"
        >
          {spotlightCards.map((item) => (
            <motion.div
              key={item.title}
              variants={zoomRise}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group rounded-[30px] overflow-hidden bg-white border border-[#eee2d1] shadow-sm hover:shadow-lg transition duration-300"
            >
              <div className="h-[270px] bg-gradient-to-br from-[#f8efe4] to-[#f2e7d8] flex items-center justify-center overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1, rotate: -1.5 }}
                  transition={{ duration: 0.45 }}
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-contain p-6"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#2f3e38]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[#436056] leading-7">{item.desc}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to={item.to}
                    className="text-[#436056] font-semibold hover:text-[#9DC183] transition"
                  >
                    View Collection →
                  </Link>
                  <Link
                    to={item.to}
                    className="text-[#436056] font-semibold hover:text-[#9DC183] transition"
                  >
                    Shop Now →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={riseUpSoft} className="mt-10 text-center">
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-block"
          >
            <Link
              to="/premium-covers"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#2f3e38] text-white font-semibold hover:bg-[#9DC183] transition duration-300"
            >
              Explore Featured Picks
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ================= BEST SELLER ================= */}
      <motion.section
        className="mt-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.12 }}
      >
        <motion.div
          variants={zoomRise}
          className="w-[94%] max-w-7xl mx-auto rounded-[40px] bg-gradient-to-r from-white to-[#f6ede0] border border-[#eadfce] shadow-[0_20px_60px_rgba(0,0,0,0.06)] px-7 sm:px-10 md:px-14 py-12 md:py-16 grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={riseLeft}>
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#7e9d72] uppercase">
              Best Seller
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-[#2f3e38]">
              Apple iPhone
              <br />
              <span className="text-[#9DC183]">Silicone Covers</span>
            </h2>

            <p className="mt-5 text-[#46524d] leading-8 text-base md:text-lg max-w-xl">
              Soft-touch, fingerprint-resistant and comfortable to hold — made
              for users who want simple luxury in everyday shades.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {["Soft Touch", "Easy Grip", "Minimal Finish"].map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ y: -4, scale: 1.04 }}
                  className="px-4 py-2 rounded-full bg-white shadow-sm text-[#436056] text-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to="/silicone-covers"
                  className="px-7 py-3 rounded-full bg-[#2f3e38] text-white font-semibold hover:bg-[#9DC183] transition duration-300 inline-block"
                >
                  Shop Silicone Covers
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to="/premium-covers"
                  className="px-7 py-3 rounded-full border border-[#436056] text-[#436056] font-semibold hover:bg-[#436056] hover:text-white transition duration-300 inline-block"
                >
                  See Best Sellers
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={riseRight}
            animate={floatSlow}
            className="flex justify-center"
          >
            <motion.img
              initial={{ scale: 1.14, opacity: 0.7 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: smoothEase }}
              viewport={{ once: false, amount: 0.12 }}
              src={iphoneCasesImg}
              alt="iPhone cases"
              className="w-full max-w-xl object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.12)]"
            />
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
};

export default Home;
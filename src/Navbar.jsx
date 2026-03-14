import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import logo from "./assets/logo.png";

const coverItems = [
  "Premium Covers",
  "Printed Covers",
  "Transparent Covers",
  "Crossbody Straps",
  "Fine Woven Magsafe",
  "Android Covers",
  "Tech Woven",
  "Luxury Covers",
  "Silicone Covers",
  "Leather Collection Magsafe",
  "Carbon Covers",
  "Baseball Knit",
  "Metal Ring Leather",
];

const watchItems = ["Watch Straps", "Watch Cases", "Watch Chargers"];

const chargingItems = [
  "Charging Cables",
  "Adapters",
  "Power Bank",
  "Car Accessories",
  "Wireless Accessories",
  "Laptop Accessories",
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem("snapcharge_user");
    setLoggedInUser(saved ? JSON.parse(saved) : null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("snapcharge_user");
    localStorage.removeItem("snapcharge_token");
    setLoggedInUser(null);
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/login");
  };

  const getProfileLetter = () => {
    if (!loggedInUser) return "U";
    if (loggedInUser.email) return loggedInUser.email.charAt(0).toUpperCase();
    if (loggedInUser.name) return loggedInUser.name.charAt(0).toUpperCase();
    return "U";
  };

  const coverRoutes = {
    "Premium Covers": "/premium-covers",
    "Printed Covers": "/printed-covers",
    "Transparent Covers": "/transparent-covers",
    "Crossbody Straps": "/crossbody-straps",
    "Fine Woven Magsafe": "/fine-woven-magsafe",
    "Android Covers": "/android-covers",
    "Tech Woven": "/tech-woven",
    "Luxury Covers": "/luxury-covers",
    "Silicone Covers": "/silicone-covers",
    "Leather Collection Magsafe": "/leather-collection-magsafe",
    "Carbon Covers": "/carbon-covers",
    "Baseball Knit": "/baseball-knit",
    "Metal Ring Leather": "/metal-ring-leather",
  };

  const watchRoutes = {
    "Watch Straps": "/watch-straps",
    "Watch Cases": "/watch-cases",
    "Watch Chargers": "/watch-chargers",
  };

  const chargingRoutes = {
    "Charging Cables": "/charging-cables",
    Adapters: "/adapters",
    "Power Bank": "/power-bank",
    "Car Accessories": "/car-accessories",
    "Wireless Accessories": "/wireless-accessories",
    "Laptop Accessories": "/laptop-accessories",
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-[999] flex justify-center">
      <div className="w-[92%] max-w-6xl">
        <header className="rounded-[26px] bg-[#FAEBD7]/95 backdrop-blur-md border-2 border-[#9DC183] shadow-[0_12px_40px_rgba(67,96,86,0.14)]">
          <div className="flex h-[70px] items-center px-4 sm:px-6">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="SnapCharge"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>

            <nav className="ml-auto hidden md:flex items-center gap-6 text-[15px] font-medium">
              <Dropdown
                label="Charging Solutions"
                items={chargingItems}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                name="charging"
                routes={chargingRoutes}
              />

              <Link
                to="/screen-protectors"
                className="text-[#436056] hover:text-[#9DC183] transition"
              >
                Screen Protector
              </Link>

              <Dropdown
                label="Covers"
                items={coverItems}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                name="covers"
                routes={coverRoutes}
              />

              <Dropdown
                label="Watch Accessories"
                items={watchItems}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                name="watch"
                routes={watchRoutes}
              />

              <Link
                to="/cart"
                className="relative rounded-full border border-[#8eb072] bg-[#9DC183] px-5 py-2 text-white font-semibold hover:bg-[#436056] hover:border-[#436056] transition shadow-sm"
              >
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full bg-[#436056] text-white text-[11px] flex items-center justify-center border border-white/30">
                    {cartCount}
                  </span>
                )}
              </Link>

              {loggedInUser ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className="h-11 w-11 rounded-full bg-[#436056] text-white flex items-center justify-center font-bold text-sm overflow-hidden border border-[#9DC183] shadow-sm"
                  >
                    {loggedInUser.photo ? (
                      <img
                        src={loggedInUser.photo}
                        alt="profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      getProfileLetter()
                    )}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-[58px] w-64 rounded-[22px] bg-[#fffaf4] border border-[#9DC183] shadow-[0_18px_35px_rgba(0,0,0,0.10)] p-4 z-[1200]">
                      <p className="text-sm font-semibold text-[#2f3e38]">
                        {loggedInUser.name || "SnapCharge User"}
                      </p>
                      <p className="text-xs text-[#436056] break-all mt-1">
                        {loggedInUser.email}
                      </p>

                      <div className="mt-4 flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            navigate("/my-orders");
                          }}
                          className="w-full rounded-xl bg-[#9DC183] text-white py-2.5 text-sm font-semibold hover:bg-[#436056] transition"
                        >
                          My Orders
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full rounded-xl bg-red-400 text-white py-2.5 text-sm font-semibold hover:bg-red-500 transition"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="h-11 w-11 rounded-full border border-[#9DC183] bg-white/60 text-[#436056] flex items-center justify-center font-bold text-sm shadow-sm hover:bg-[#9DC183] hover:text-white transition"
                  title="Login"
                >
                  U
                </Link>
              )}
            </nav>

            <div className="ml-auto md:hidden flex items-center gap-3">
              <Link
                to="/cart"
                className="relative rounded-full border border-[#8eb072] bg-[#9DC183] px-4 py-2 text-white text-sm font-semibold shadow-sm"
              >
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] px-1 rounded-full bg-[#436056] text-white text-[10px] flex items-center justify-center border border-white/30">
                    {cartCount}
                  </span>
                )}
              </Link>

              {loggedInUser ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className="h-10 w-10 rounded-full bg-[#436056] text-white flex items-center justify-center font-bold text-sm overflow-hidden border border-[#9DC183] shadow-sm"
                  >
                    {loggedInUser.photo ? (
                      <img
                        src={loggedInUser.photo}
                        alt="profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      getProfileLetter()
                    )}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-[52px] w-56 rounded-[20px] bg-[#fffaf4] border border-[#9DC183] shadow-[0_18px_35px_rgba(0,0,0,0.10)] p-4 z-[1200]">
                      <p className="text-sm font-semibold text-[#2f3e38]">
                        {loggedInUser.name || "SnapCharge User"}
                      </p>
                      <p className="text-xs text-[#436056] break-all mt-1">
                        {loggedInUser.email}
                      </p>

                      <div className="mt-4 flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            setMobileOpen(false);
                            navigate("/my-orders");
                          }}
                          className="w-full rounded-xl bg-[#9DC183] text-white py-2.5 text-sm font-semibold"
                        >
                          My Orders
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full rounded-xl bg-red-400 text-white py-2.5 text-sm font-semibold"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="h-10 w-10 rounded-full border border-[#9DC183] bg-white/60 text-[#436056] flex items-center justify-center font-bold text-sm shadow-sm"
                  title="Login"
                >
                  U
                </Link>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="h-10 w-10 rounded-full border border-[#9DC183] bg-white/60 text-[#436056] text-xl flex items-center justify-center shadow-sm"
              >
                ☰
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden border-t border-[#9DC183] bg-[#fffaf2] px-4 pb-4">
              <MobileSection
                title="Charging Solutions"
                items={chargingItems}
                routes={chargingRoutes}
                setMobileOpen={setMobileOpen}
              />

              <Link
                to="/screen-protectors"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-[#436056] font-medium"
              >
                Screen Protector
              </Link>

              <MobileSection
                title="Covers"
                items={coverItems}
                routes={coverRoutes}
                setMobileOpen={setMobileOpen}
              />

              <MobileSection
                title="Watch Accessories"
                items={watchItems}
                routes={watchRoutes}
                setMobileOpen={setMobileOpen}
              />

              {loggedInUser && (
                <>
                  <Link
                    to="/my-orders"
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-[#436056] font-medium"
                  >
                    My Orders
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="block py-2 text-[#436056] font-medium"
                  >
                    Logout
                  </button>
                </>
              )}

              {!loggedInUser && (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-[#436056] font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </header>
      </div>
    </div>
  );
};

const Dropdown = ({ label, items, openMenu, setOpenMenu, name, routes }) => {
  const isOpen = openMenu === name;

  const panelBase =
    "absolute left-0 top-full mt-4 w-64 rounded-[22px] bg-[#fffaf4] border border-[#9DC183] shadow-[0_18px_35px_rgba(0,0,0,0.10)] backdrop-blur-md transition-all duration-300 overflow-hidden z-[1000]";
  const panelState = isOpen
    ? " opacity-100 visible translate-y-0"
    : " opacity-0 invisible -translate-y-2";

  const baseClasses =
    "block px-5 py-2.5 hover:bg-[#9DC18322] hover:text-[#436056] cursor-pointer transition";

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenMenu(name)}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <button className="text-[#436056] hover:text-[#9DC183] transition flex items-center gap-1">
        {label} <span className="text-xs mt-[1px]">▾</span>
      </button>

      <div className={panelBase + panelState}>
        <ul className="py-3 text-sm text-[#2f3e38] max-h-80 overflow-y-auto">
          {items.map((item) => {
            const route = routes[item];

            if (route) {
              return (
                <li key={item}>
                  <Link to={route} className={baseClasses}>
                    {item}
                  </Link>
                </li>
              );
            }

            return (
              <li key={item}>
                <span className={baseClasses}>{item}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const MobileSection = ({ title, items, routes, setMobileOpen }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-2 border-b border-[#dfe8d7] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-2 font-semibold text-[#436056] flex items-center justify-between"
      >
        {title}
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="pl-3 pb-1">
          {items.map((item) => (
            <Link
              key={item}
              to={routes[item]}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-[#436056] hover:text-[#9DC183] transition"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
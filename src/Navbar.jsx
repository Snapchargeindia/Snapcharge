import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import logo from "./assets/logo.png";
import { User, Menu, X, ChevronDown } from "lucide-react";

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

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);
  const menuCloseTimer = useRef(null);

  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const syncUser = () => {
      const saved = localStorage.getItem("snapcharge_user");
      setLoggedInUser(saved ? JSON.parse(saved) : null);
    };

    syncUser();
    window.addEventListener("storage", syncUser);

    return () => window.removeEventListener("storage", syncUser);
  }, []);

 useEffect(() => {
  const savedUser = localStorage.getItem("snapcharge_user");
  const token = localStorage.getItem("snapcharge_token");

  if (savedUser && token) {
    setLoggedInUser(JSON.parse(savedUser));
  } else {
    setLoggedInUser(null);
  }
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
    navigate("/login", { replace: true });
  };

  const handleMyOrders = () => {
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/my-orders");
  };

  const handleProfileClick = () => {
    if (!loggedInUser) {
      navigate("/login");
      return;
    }
    setProfileOpen((prev) => !prev);
  };

  const getProfileLetter = () => {
    if (!loggedInUser) return "U";
    if (loggedInUser.name) return loggedInUser.name.charAt(0).toUpperCase();
    if (loggedInUser.email) return loggedInUser.email.charAt(0).toUpperCase();
    return "U";
  };

  const openDropdown = (name) => {
    if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current);
    setOpenMenu(name);
  };

  const closeDropdown = () => {
    menuCloseTimer.current = setTimeout(() => {
      setOpenMenu(null);
    }, 120);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-[999] flex justify-center">
      <div className="w-[92%] max-w-6xl">
        <header className="rounded-[26px] bg-[#FAEBD7]/95 backdrop-blur-md border-2 border-[#9DC183] shadow-[0_12px_40px_rgba(67,96,86,0.14)]">
          <div className="flex h-[70px] items-center px-4 sm:px-6">
            <Link to="/" className="flex items-center shrink-0">
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
                openDropdown={openDropdown}
                closeDropdown={closeDropdown}
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
                openDropdown={openDropdown}
                closeDropdown={closeDropdown}
                name="covers"
                routes={coverRoutes}
              />

              <Dropdown
                label="Watch Accessories"
                items={watchItems}
                openMenu={openMenu}
                openDropdown={openDropdown}
                closeDropdown={closeDropdown}
                name="watch"
                routes={watchRoutes}
              />

              <Link
                to="/cart"
                className="relative rounded-full border border-[#8eb072] bg-[#9DC183] px-5 py-2 text-white font-semibold hover:bg-[#436056] hover:border-[#436056] transition"
              >
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full bg-[#436056] text-white text-[11px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={handleProfileClick}
                  className="h-11 w-11 flex items-center justify-center rounded-full border border-[#9DC183] text-[#436056] hover:bg-[#9DC18322] transition"
                >
                  {loggedInUser ? (
                    <span className="h-7 w-7 flex items-center justify-center rounded-full bg-[#9DC183] text-white text-sm font-bold">
                      {getProfileLetter()}
                    </span>
                  ) : (
                    <User size={22} />
                  )}
                </button>

                {loggedInUser && profileOpen && (
                  <div className="absolute right-0 top-[58px] w-64 rounded-[22px] bg-[#fffaf4] border border-[#9DC183] shadow-[0_18px_35px_rgba(0,0,0,0.10)] p-4 z-[1200]">
                    <p className="text-sm font-semibold text-[#2f3e38]">
                      {loggedInUser.name || "SnapCharge User"}
                    </p>

                    <p className="text-xs text-[#436056] break-all mt-1">
                      {loggedInUser.email}
                    </p>

                    <div className="mt-4 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={handleMyOrders}
                        className="w-full rounded-xl bg-[#9DC183] text-white py-2.5 text-sm font-semibold hover:bg-[#436056] transition"
                      >
                        My Orders
                      </button>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full rounded-xl bg-red-400 text-white py-2.5 text-sm font-semibold hover:bg-red-500 transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            <div className="ml-auto flex md:hidden items-center gap-3">
              <Link
                to="/cart"
                className="relative rounded-full border border-[#8eb072] bg-[#9DC183] px-4 py-2 text-white text-sm font-semibold"
              >
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] px-1 rounded-full bg-[#436056] text-white text-[10px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={handleProfileClick}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-[#9DC183] text-[#436056] hover:bg-[#9DC18322] transition"
              >
                {loggedInUser ? (
                  <span className="h-7 w-7 flex items-center justify-center rounded-full bg-[#9DC183] text-white text-sm font-bold">
                    {getProfileLetter()}
                  </span>
                ) : (
                  <User size={20} />
                )}
              </button>

              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-[#9DC183] text-[#436056] hover:bg-[#9DC18322] transition"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden border-t border-[#dfe8d7] bg-[#fffaf4] px-4 py-4 rounded-b-[26px]">
              <div className="space-y-2">
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
                    <button
                      onClick={handleMyOrders}
                      className="block w-full text-left py-2 text-[#436056] font-medium"
                    >
                      My Orders
                    </button>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left py-2 text-[#436056] font-medium"
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
            </div>
          )}
        </header>
      </div>
    </div>
  );
};

const Dropdown = ({
  label,
  items,
  openMenu,
  openDropdown,
  closeDropdown,
  name,
  routes,
}) => {
  const isOpen = openMenu === name;

  return (
    <div
      className="relative"
      onMouseEnter={() => openDropdown(name)}
      onMouseLeave={closeDropdown}
    >
      <button className="text-[#436056] hover:text-[#9DC183] transition flex items-center gap-1">
        {label}
        <ChevronDown size={16} />
      </button>

      <div
        className={`absolute left-0 top-full pt-3 z-[1200] ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="w-64 rounded-[20px] bg-[#fffaf4] border border-[#9DC183] shadow-[0_18px_35px_rgba(0,0,0,0.10)] overflow-hidden">
          <ul className="py-2 text-sm">
            {items.map((item) => (
              <li key={item}>
                <Link
                  to={routes[item]}
                  className="block px-4 py-2.5 text-[#436056] hover:bg-[#9DC18322] transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const MobileSection = ({ title, items, routes, setMobileOpen }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#e8eadf] pb-2">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between py-2 text-[#436056] font-medium"
      >
        <span>{title}</span>
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="pl-3 pt-1">
          {items.map((item) => (
            <Link
              key={item}
              to={routes[item]}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-[#436056]"
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
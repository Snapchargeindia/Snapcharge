import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://api.snapchargee.in");

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim",
  "Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi",
  "Jammu and Kashmir","Ladakh","Puducherry","Chandigarh","Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli","Daman and Diu","Lakshadweep"
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("snapcharge_token");
  const { cartItems, cartTotal, clearCart } = useCart();

  const buyNowItem = useMemo(() => {
    const saved = localStorage.getItem("snapcharge_buy_now");
    return saved ? JSON.parse(saved) : null;
  }, []);

  const items = useMemo(() => (buyNowItem ? [buyNowItem] : cartItems), [buyNowItem, cartItems]);

  const loggedInUser = useMemo(() => {
    const savedUser = localStorage.getItem("snapcharge_user");
    return savedUser ? JSON.parse(savedUser) : null;
  }, []);

  const [formData, setFormData] = useState({
    fullName: loggedInUser?.name || "",
    phone: loggedInUser?.phone ? String(loggedInUser.phone).replace(/^\+91/, "") : "",
    address: "",
    city: "",
    state: "",
    openStateDropdown: false,
    pincode: "",
    paymentMethod: "COD",
    addressType: "HOME",
  });

  const [addresses, setAddresses] = useState([]); // multiple addresses
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(true);
  const [loading, setLoading] = useState(false);
    useEffect(() => {
    const savedAddresses = localStorage.getItem("snapcharge_addresses");
    if (savedAddresses) {
      const parsed = JSON.parse(savedAddresses);
      setAddresses(parsed);
      if (parsed.length > 0) {
        setSelectedAddressIndex(0);
        setFormData(prev => ({ ...prev, ...parsed[0], openStateDropdown: false }));
        setShowAddressForm(false);
      }
    }
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "phone") value = value.replace(/\D/g, "").slice(0, 10);
    if (name === "pincode") value = value.replace(/\D/g, "").slice(0, 6);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert("Please fill all fields");
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      alert("Please enter a valid Indian phone number");
      return false;
    }
    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      alert("Please enter a valid 6-digit pincode");
      return false;
    }
    if (!items.length) {
      alert("No product selected for checkout.");
      return false;
    }
    return true;
  };

  const handleSaveAddress = () => {
    if (!validateForm()) return;

    let newAddresses = [...addresses];
    if (selectedAddressIndex !== null) {
      // update existing
      newAddresses[selectedAddressIndex] = { ...formData };
    } else {
      // add new
      newAddresses.push({ ...formData });
      setSelectedAddressIndex(newAddresses.length - 1);
    }

    setAddresses(newAddresses);
    localStorage.setItem("snapcharge_addresses", JSON.stringify(newAddresses));
    setShowAddressForm(false);
  };

  const handleEditAddress = (index) => {
    setFormData(prev => ({ ...prev, ...addresses[index], openStateDropdown: false }));
    setSelectedAddressIndex(index);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (index) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(newAddresses);
    localStorage.setItem("snapcharge_addresses", JSON.stringify(newAddresses));
    if (newAddresses.length > 0) {
      setSelectedAddressIndex(0);
      setFormData(prev => ({ ...prev, ...newAddresses[0], openStateDropdown: false }));
      setShowAddressForm(false);
    } else {
      setSelectedAddressIndex(null);
      setFormData({
        fullName: loggedInUser?.name || "",
        phone: loggedInUser?.phone ? String(loggedInUser.phone).replace(/^\+91/, "") : "",
        address: "",
        city: "",
        state: "",
        openStateDropdown: false,
        pincode: "",
        paymentMethod: "COD",
        addressType: "HOME",
      });
      setShowAddressForm(true);
    }
  };
    const totalAmount = useMemo(() => {
    const base = buyNowItem
      ? Number(buyNowItem.price || 0) * Number(buyNowItem.quantity || 1)
      : cartTotal;
    return formData.paymentMethod === "COD" ? base + 100 : base;
  }, [buyNowItem, cartTotal, formData.paymentMethod]);

  const handleCODOrder = async () => {
    try {
      setLoading(true);
      for (const item of items) {
        const payload = {
          userId: loggedInUser?._id || null,
          customerName: formData.fullName,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          productName: item.name,
          productId: item.id || item._id || "",
          productImage: item.image || "",
          variant: item.variant || item.selectedVariant || "Default",
          quantity: Number(item.quantity || 1),
          amount: Number(item.price || 0) * Number(item.quantity || 1) + 100,
        };
        const res = await fetch(`${API_URL}/api/payment/create-cod-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          alert(data.message || "Failed to place COD order");
          return;
        }
      }
      if (buyNowItem) localStorage.removeItem("snapcharge_buy_now");
      else clearCart();
      localStorage.setItem("snapcharge_last_order", JSON.stringify({ items, total: totalAmount, paymentMethod: "COD" }));
      navigate("/order-success", { replace: true });
    } catch (err) {
      console.log(err);
      alert("COD order failed");
    } finally { setLoading(false); }
  };

  const loadRazorpayScript = () => new Promise(resolve => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const handleOnlinePayment = async () => {
    try {
      setLoading(true);
      const loaded = await loadRazorpayScript();
      if (!loaded) { alert("Razorpay SDK failed to load"); return; }

      const payload = {
        userId: loggedInUser?._id || null,
        customerName: formData.fullName,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        items: items.map(item => ({
          productName: item.name,
          productId: item.id || item._id || "",
          productImage: item.image || "",
          variant: item.variant || item.selectedVariant || "Default",
          quantity: Number(item.quantity || 1),
          price: Number(item.price || 0),
          amount: Number(item.price || 0) * Number(item.quantity || 1)
        })),
        totalAmount
      };

      const res = await fetch(`${API_URL}/api/payment/create-online-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) { alert(data.message || "Online payment failed"); return; }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "Snapcharge",
        description: "Order Payment",
        order_id: data.orderId,
        handler: async function (response) {
          localStorage.setItem("snapcharge_last_order", JSON.stringify({ items, total: totalAmount, paymentMethod: "Online", paymentId: response.razorpay_payment_id }));
          if (buyNowItem) localStorage.removeItem("snapcharge_buy_now");
          else clearCart();
          navigate("/order-success", { replace: true });
        },
        prefill: { name: formData.fullName, contact: formData.phone },
        notes: { address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}` },
        theme: { color: "#9DC183" },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rz = new window.Razorpay(options);
      rz.open();
    } catch (err) {
      console.log(err);
      alert("Online payment failed");
    } finally { setLoading(false); }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    formData.paymentMethod === "COD" ? await handleCODOrder() : await handleOnlinePayment();
  };
    if (!items.length) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAEBD7]">
      <div className="bg-white p-8 rounded-3xl shadow text-center">
        <h2 className="text-xl font-bold text-[#436056] mb-3">No products selected</h2>
        <button onClick={() => navigate("/")} className="px-6 py-3 bg-[#9DC183] text-white rounded-full hover:bg-[#436056] transition">Go Home</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-16 pb-16 px-4 sm:px-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
      >
        &larr; Back
      </button>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.5fr,0.9fr] gap-10">
        {/* Checkout Form */}
        <div className="bg-white rounded-3xl shadow p-6 sm:p-8 hover:shadow-xl transition duration-300">
          <h1 className="text-3xl font-bold text-[#436056] mb-6">Checkout</h1>

          {/* Multiple Addresses List */}
          {addresses.length > 0 && !showAddressForm && (
            <div className="space-y-3 mb-4">
              {addresses.map((addr, i) => (
                <div key={i} className={`border rounded-2xl p-4 ${selectedAddressIndex===i ? "bg-[#f0fdf4]" : "bg-[#fdfdfd]"} flex justify-between items-center`}>
                  <div onClick={() => { setSelectedAddressIndex(i); setFormData(prev => ({ ...prev, ...addr, openStateDropdown:false })); setShowAddressForm(false); }}>
                    <p className="font-semibold">{addr.fullName}</p>
                    <p className="text-gray-600">{addr.address}, {addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-gray-600">{addr.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditAddress(i)} className="px-3 py-1 bg-[#9DC183] text-white rounded-lg hover:bg-[#365045] transition">Edit</button>
                    <button onClick={() => handleDeleteAddress(i)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Address Form */}
          {showAddressForm && (
            <form onSubmit={handlePlaceOrder} className="space-y-3">
              <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#9DC183]" />
              <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#9DC183]" />
              <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#9DC183]" />
              <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#9DC183]" />
              {/* State dropdown */}
              <div className="relative w-full">
                <div className="border p-3 rounded-xl cursor-pointer flex justify-between items-center" onClick={() => setFormData(prev => ({ ...prev, openStateDropdown: !prev.openStateDropdown }))}>
                  {formData.state || "Select State"} <span className={`${formData.openStateDropdown ? "rotate-180" : "rotate-0"} transition-transform`}>▼</span>
                </div>
                {formData.openStateDropdown && (
                  <div className="absolute top-full left-0 right-0 max-h-60 overflow-y-auto border bg-white rounded-xl mt-1 z-50 shadow-lg">
                    {INDIAN_STATES.map(s => (
                      <div key={s} className="p-2 hover:bg-[#9DC183] hover:text-white cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, state: s, openStateDropdown: false }))}>{s}</div>
                    ))}
                  </div>
                )}
              </div>
              <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#9DC183]" />
              <select name="addressType" value={formData.addressType} onChange={handleChange} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#9DC183]">
                <option value="HOME">HOME</option>
                <option value="WORK">WORK</option>
                <option value="OTHER">OTHER</option>
              </select>
              <button type="button" onClick={handleSaveAddress} className="w-full bg-[#436056] text-white py-3 rounded-full hover:bg-[#365045] transition">Save Address</button>
            </form>
          )}

          {/* Payment & Place Order */}
          {!showAddressForm && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-[#436056] mb-2">Payment Method</p>
              <div className="flex flex-col gap-2 text-sm text-[#436056] mb-4">
                <label className="flex items-center gap-2"><input type="radio" name="paymentMethod" value="COD" checked={formData.paymentMethod==="COD"} onChange={handleChange}/> Cash on Delivery <span className="text-red-500 font-bold">₹100 charges</span></label>
                <label className="flex items-center gap-2"><input type="radio" name="paymentMethod" value="Online" checked={formData.paymentMethod==="Online"} onChange={handleChange}/> Online Payment</label>
              </div>
              <button onClick={handlePlaceOrder} disabled={loading} className="w-full bg-[#9DC183] text-white py-3 rounded-full hover:bg-[#436056] transition disabled:opacity-60">
                {loading ? "Please wait..." : formData.paymentMethod==="COD" ? `Place Order ₹${totalAmount}` : `Pay Now ₹${totalAmount}`}
              </button>
            </div>
          )}
        </div>

                {/* Order Summary */}
        <div className="bg-white rounded-3xl shadow p-6 h-fit hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-bold text-[#436056] mb-5">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={`${item.id || item._id || index}`} className="flex gap-3 border-b pb-4">
                <img src={item.image || "/placeholder.png"} alt={item.name} className="w-20 h-20 object-contain rounded-lg bg-[#f8f8f8]" />
                <div className="flex-1">
                  <p className="font-semibold text-[#436056] text-sm">{item.name}</p>
                  {(item.variant || item.selectedVariant) && (
                    <p className="text-xs text-gray-500 mt-1">Variant: {item.variant || item.selectedVariant}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-2">Qty: {item.quantity || 1}</p>
                  <p className="text-sm font-semibold text-[#436056] mt-1">
                    ₹{Number(item.price || 0) * Number(item.quantity || 1)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-5 mt-5 border-t flex justify-between text-lg font-bold text-[#436056]">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
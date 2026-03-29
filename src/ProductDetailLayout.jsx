import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

// ✅ API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const IS_DEV = false;

const ENV = {
  uiScript: IS_DEV
    ? "https://fastrr-boost-ui-dev.pickrr.com/assets/js/channels/login.js"
    : "https://checkout-ui.shiprocket.com/assets/js/channels/login.js",
  uiCss: IS_DEV
    ? "https://fastrr-boost-ui-dev.pickrr.com/assets/styles/shopify.css"
    : "https://checkout-ui.shiprocket.com/assets/styles/shopify.css",
};

const loadShiprocketAssets = () =>
  new Promise((resolve) => {
    if (!document.querySelector(`link[href="${ENV.uiCss}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = ENV.uiCss;
      document.head.appendChild(link);
    }
    if (document.querySelector(`script[src="${ENV.uiScript}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = ENV.uiScript;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });

// ✅ Shared Shiprocket checkout function
const runShiprocketCheckout = async ({
  navigate,
  cartItems,
  cartTotal,
  setLoading,
  onSuccess,
}) => {
  setLoading(true);

  try {
    // ✅ localhost hataya
    const tokenRes = await fetch(`${API_URL}/api/shiprocket/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.success || !tokenData.token) {
      alert("Failed to initiate checkout. Try again.");
      setLoading(false);
      return;
    }

    const loaded = await loadShiprocketAssets();
    if (!loaded || !window.HeadlessCheckout) {
      alert("Checkout failed to load. Refresh page and try again.");
      setLoading(false);
      return;
    }

    window.HeadlessCheckout.buyNow(
      { preventDefault: () => {} },
      tokenData.token,
      {
        amount: cartTotal,
        themecolor: "436056",
        image: cartItems[0]?.image || "",
      },
      async (response) => {
        if (response?.status === "success") {
          const addresses = response.data?.addresses || [];
          const phone = response.data?.phone || "";
          const address = addresses[0] || {};

          // ✅ localhost hataya
          const orderRes = await fetch(`${API_URL}/api/shiprocket/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              cartItems,
              cartTotal,
              customer: {
                name: `${address.first_name || ""} ${address.last_name || ""}`.trim(),
                email: address.email || "",
                phone: address.phone || phone || "",
                address: address.line1 || "",
                city: address.city || "",
                pincode: address.pincode || "",
                state: address.state || "",
              },
            }),
          });

          const orderData = await orderRes.json();

          if (orderData.checkoutUrl) {
            window.location.href = orderData.checkoutUrl;
          } else {
            alert(`✅ Order placed! Order ID: ${orderData.orderId || "N/A"}`);
            if (onSuccess) onSuccess();
            navigate("/order-success");
          }
        } else {
          alert("Checkout cancelled. Try again.");
        }
        setLoading(false);
      }
    );
  } catch (err) {
    console.error("Checkout error:", err);
    alert("Something went wrong. Try again.");
    setLoading(false);
  }
};

const ProductDetailLayout = ({
  product,
  related = [],
  relatedPath = "/",
  title,
  description,
  specs = [],
  deliveryReturn = {},
  images = [],
  variantOptions = [],
  variantLabel = "Select Variant",
  whyBuyLines = [],
  colorOptions = [],
}) => {
  const navigate = useNavigate();
  const { addToCart, clearCart } = useCart();

  const [variantIndex, setVariantIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingBuyNow, setLoadingBuyNow] = useState(false);

  const safeWhyBuy = whyBuyLines?.length
    ? whyBuyLines
    : [
        "Premium quality products",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ];

  const safeVariants = useMemo(() => {
    if (variantOptions?.length) return variantOptions;
    return [{ label: "Default", price: product?.price ?? 0, mrp: product?.mrp ?? 0 }];
  }, [variantOptions, product]);

  const selectedVariant = safeVariants[variantIndex] || safeVariants[0];

  const gallery = useMemo(() => {
    const variantImgs = selectedVariant?.images?.filter(Boolean) || [];
    const baseImgs = images?.filter(Boolean) || [];
    return variantImgs.length ? variantImgs : baseImgs;
  }, [selectedVariant, images]);

  const [selectedImage, setSelectedImage] = useState(gallery[0] || "");
  useEffect(() => setSelectedImage(gallery[0] || ""), [gallery]);
  useEffect(() => { loadShiprocketAssets(); }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAEBD7] flex items-center justify-center px-4">
        <div className="bg-white px-8 py-6 rounded-2xl shadow-md text-center">
          <p className="text-lg font-semibold text-[#3f5c4a] mb-4">Product not found.</p>
          <button onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-full bg-[#7aa874] text-white text-sm font-medium hover:bg-[#6b9a65] transition">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const finalDetails = selectedVariant?.details || description || product.details || product.description || "";
  const finalSpecs = selectedVariant?.specs?.length ? selectedVariant.specs : specs || [];
  const shipping = deliveryReturn?.shipping || "Free delivery on prepaid orders. Dispatch within 24-48 hours.";
  const returns = deliveryReturn?.returns || "7-day replacement for manufacturing defects only.";
  const care = deliveryReturn?.care || "Clean gently with a soft microfiber cloth.";

  const currentItem = {
    id: `${product.id || product._id}-${selectedVariant?.label || "default"}`,
    name: selectedVariant?.label
      ? `${title || product.name} (${selectedVariant.label})`
      : title || product.name,
    price: selectedVariant?.price ?? product.price ?? 0,
    image: selectedImage || product.image || product.images?.[0] || "",
    subtitle: finalDetails,
    quantity: 1,
    variant: selectedVariant?.label || "Default",
  };

  const handleAddToCart = async () => {
    addToCart(currentItem);
    await runShiprocketCheckout({
      navigate,
      cartItems: [currentItem],
      cartTotal: currentItem.price,
      setLoading: setLoadingCart,
      onSuccess: clearCart,
    });
  };

  const handleBookNow = async () => {
    await runShiprocketCheckout({
      navigate,
      cartItems: [currentItem],
      cartTotal: currentItem.price,
      setLoading: setLoadingBuyNow,
      onSuccess: null,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto mb-6">
        <button onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow hover:shadow-md text-sm text-[#3f5c4a] font-medium">
          ← Back
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-[#f6ebdd] rounded-[32px] p-6 sm:p-8 flex flex-col lg:flex-row gap-8">

        {/* Gallery */}
        <div className="flex-1">
          <div className="bg-white rounded-3xl flex items-center justify-center h-[320px] sm:h-[380px] mb-5 shadow">
            {selectedImage
              ? <img src={selectedImage} alt={title || product.name} className="max-h-full max-w-full object-contain" />
              : <div className="h-full w-full flex items-center justify-center text-sm text-gray-400">Image Coming Soon</div>}
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {(gallery.length ? gallery : ["", "", ""]).map((img, i) => (
              <button key={i} type="button" onClick={() => img && setSelectedImage(img)}
                className={`min-w-[70px] h-[80px] rounded-2xl border flex items-center justify-center bg-[#f8f4ee] transition ${
                  selectedImage === img ? "border-[#3f5c4a]" : "border-transparent hover:border-[#3f5c4a]"
                }`}>
                {img
                  ? <img src={img} alt={`${title || product.name} ${i + 1}`} className="max-h-full max-w-full object-contain p-1" />
                  : <span className="text-[10px] text-gray-400 px-1">Image</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2f4737] leading-snug">{title || product.name}</h1>

          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold text-[#2f4737]">₹{selectedVariant.price}</span>
            <span className="text-sm text-[#8b8b8b] line-through">₹{selectedVariant.mrp}</span>
            <span className="text-[11px] text-[#9a9a9a]">MRP inclusive of all taxes</span>
          </div>

          {colorOptions?.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-[#2f4737] mb-2">Color</p>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((color) => (
                  <button key={color.name} type="button"
                    onClick={() => color.targetId && navigate(`${relatedPath}/${color.targetId}`)}
                    className="flex flex-col items-center gap-2">
                    <span className={`w-10 h-10 rounded-full border-2 ${color.targetId === product.id ? "border-black" : "border-[#d4d4d4]"}`}
                      style={{ backgroundColor: color.swatch || color.code }} />
                    <span className="text-xs text-[#2f4737]">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {safeVariants?.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-[#2f4737] mb-2">{variantLabel}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {safeVariants.map((v, i) => (
                  <button key={v.label || i} type="button" onClick={() => setVariantIndex(i)}
                    className={`px-4 py-2 rounded-full transition ${
                      i === variantIndex ? "bg-black text-white" : "bg-white border border-[#d4d4d4] text-[#2f4737] hover:bg-[#f8f4ee]"
                    }`}>
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="mt-4 text-sm text-[#556659]">{finalDetails}</p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={handleAddToCart} disabled={loadingCart}
              className="flex-1 bg-[#7aa874] hover:bg-[#6b9a65] text-white py-3 rounded-full font-semibold text-sm sm:text-base transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loadingCart ? (
                <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="30" strokeDashoffset="10"/>
                </svg>Loading…</>
              ) : "ADD TO CART"}
            </button>

            <button onClick={handleBookNow} disabled={loadingBuyNow}
              className="flex-1 bg-[#9DC183] hover:bg-[#436056] text-white py-3 rounded-full font-semibold text-sm sm:text-base transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loadingBuyNow ? (
                <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="30" strokeDashoffset="10"/>
                </svg>Loading…</>
              ) : "BOOK NOW"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_320px] gap-6 items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-10 border-b border-[#e7d9c2] text-sm font-semibold text-[#9aa3b2]">
            {[
              { key: "details", label: "Product Details" },
              { key: "specs", label: "Specifications" },
              { key: "delivery", label: "Delivery & Returns" },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`pb-4 transition ${activeTab === key ? "text-[#2f5a4d] border-b-2 border-[#7aa874]" : "hover:text-[#2f5a4d]"}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="mt-5 bg-[#f8f8f8] rounded-[24px] shadow-sm border border-[#e8e1d4] px-6 py-7 text-[#4e5d56] min-h-[116px]">
            {activeTab === "details" && <p className="text-[15px] leading-7">{finalDetails}</p>}
            {activeTab === "specs" && (
              <ul className="list-disc list-inside space-y-2 text-[15px] leading-7">
                {finalSpecs?.length
                  ? finalSpecs.map((spec, i) => <li key={i}>{spec}</li>)
                  : <li>No specifications available.</li>}
              </ul>
            )}
            {activeTab === "delivery" && (
              <div className="space-y-4 text-[15px] leading-7">
                <p><span className="font-semibold text-[#2f4737]">Delivery:</span> {shipping}</p>
                <p><span className="font-semibold text-[#2f4737]">Returns:</span> {returns}</p>
                <p><span className="font-semibold text-[#2f4737]">Care:</span> {care}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-[24px] shadow-sm border border-[#e8e1d4] px-6 py-6 text-sm text-[#56665a] h-fit self-start">
          <h3 className="font-semibold text-[#2f4737] mb-3">Why buy from SnapCharge?</h3>
          <ul className="list-disc list-inside space-y-2 leading-7">
            {safeWhyBuy.map((line, i) => <li key={i}>{line}</li>)}
          </ul>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="max-w-6xl mx-auto mt-14">
          <h2 className="text-2xl font-bold text-[#2f5a4d] mb-6">Related Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((item) => (
              <div key={item.id} onClick={() => navigate(`${relatedPath}/${item.id}`)}
                className="bg-white rounded-3xl p-4 cursor-pointer shadow hover:shadow-lg transition">
                {item.images?.[0] || item.image
                  ? <img src={item.images?.[0] || item.image} alt={item.name} className="h-40 mx-auto object-contain" />
                  : <div className="h-40 flex items-center justify-center text-xs text-gray-400">Image</div>}
                <h3 className="mt-3 font-semibold text-[#2f4737]">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailLayout;
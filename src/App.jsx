import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import OrderSuccess from "./OrderSuccess";

import ScreenProtector from "./ScreenProtector";
import ScreenProtectorDetail from "./ScreenProtectorDetail";

// COVERS
import PremiumCovers from "./PremiumCovers";
import PrintedCovers from "./PrintedCovers";
import TransparentCovers from "./TransparentCovers";
import CrossbodyStraps from "./CrossbodyStraps";
import FineWovenMagsafe from "./FineWovenMagsafe";
import AndroidCovers from "./AndroidCovers";
import TechWoven from "./TechWoven";
import LuxuryCovers from "./LuxuryCovers";
import SiliconeCovers from "./SiliconeCovers";
import LeatherCollectionMagsafe from "./LeatherCollectionMagsafe";
import CarbonCovers from "./CarbonCovers";
import BaseballKnit from "./BaseballKnit";
import MetalRingLeather from "./MetalRingLeather";

// WATCH
import WatchStraps from "./WatchStraps";
import WatchCases from "./WatchCases";
import WatchChargers from "./WatchChargers";

// CHARGING
import PowerBank from "./PowerBank";
import CarAccessories from "./CarAccessories";
import AdaptersPage from "./AdaptersPage";
import WirelessAccessories from "./WirelessAccessories";
import LaptopAccessories from "./LaptopAccessories";
import TravelAccessories from "./TravelAccessories";
import ChargingCables from "./ChargingCables";

// DETAIL PAGES
import PremiumCoverDetail from "./PremiumCoverDetail";
import PrintedCoverDetail from "./PrintedCoverDetail";
import TransparentCoverDetails from "./TransparentCoverDetails";
import MetalRingLeatherDetail from "./MetalRingLeatherDetail";
import TechWovenDetail from "./TechWovenDetail";
import FineWovenMagsafeDetail from "./FineWovenMagsafeDetail";
import CrossbodyStrapDetail from "./CrossbodyStrapDetail";
import AndroidCoverDetail from "./AndroidCoverDetail";
import BaseballKnitDetail from "./BaseballKnitDetail";
import CarbonCoverDetail from "./CarbonCoverDetail";
import LeatherCollectionMagsafeDetail from "./LeatherCollectionMagsafeDetail";
import LuxuryCoverDetail from "./LuxuryCoverDetail";
import SiliconeCoverDetail from "./SiliconeCoverDetail";
import WatchStrapDetail from "./WatchStrapDetail";
import WatchCaseDetail from "./WatchCaseDetail";
import WatchChargerDetail from "./WatchChargerDetail";
import PowerBankDetail from "./PowerBankDetail";
import CarAccessoryDetail from "./CarAccessoryDetail";
import AdapterDetail from "./AdapterDetail";
import LaptopAccessoryDetail from "./LaptopAccessoryDetail";
import TravelAccessoryDetail from "./TravelAccessoryDetail";
import ChargingCableDetail from "./ChargingCableDetail";
import WirelessAccessoryDetail from "./WirelessAccessoryDetail";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import TestProducts from "./TestProducts";
function App() {
  return (
    <Router>
      <Navbar />
     <ScrollToTop />
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* CART + CHECKOUT */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* SCREEN PROTECTORS */}
        <Route path="/screen-protectors" element={<ScreenProtector />} />
        <Route
          path="/screen-protectors/:id"
          element={<ScreenProtectorDetail />}
        />

        {/* COVERS */}
        <Route path="/premium-covers" element={<PremiumCovers />} />
        <Route path="/printed-covers" element={<PrintedCovers />} />
        <Route path="/transparent-covers" element={<TransparentCovers />} />
        <Route path="/crossbody-straps" element={<CrossbodyStraps />} />
        <Route path="/fine-woven-magsafe" element={<FineWovenMagsafe />} />
        <Route path="/android-covers" element={<AndroidCovers />} />
        <Route path="/tech-woven" element={<TechWoven />} />
        <Route path="/luxury-covers" element={<LuxuryCovers />} />
        <Route path="/silicone-covers" element={<SiliconeCovers />} />
        <Route
          path="/leather-collection-magsafe"
          element={<LeatherCollectionMagsafe />}
        />
        <Route path="/carbon-covers" element={<CarbonCovers />} />
        <Route path="/baseball-knit" element={<BaseballKnit />} />
        <Route path="/metal-ring-leather" element={<MetalRingLeather />} />

        {/* COVER DETAILS */}
        <Route path="/premium-covers/:slug" element={<PremiumCoverDetail />} />
        <Route path="/printed-covers/:id" element={<PrintedCoverDetail />} />
        <Route
          path="/transparent-covers/:id"
          element={<TransparentCoverDetails />}
        />
        <Route
          path="/crossbody-straps/:id"
          element={<CrossbodyStrapDetail />}
        />
        <Route
          path="/fine-woven-magsafe/:id"
          element={<FineWovenMagsafeDetail />}
        />
        <Route path="/android-covers/:id" element={<AndroidCoverDetail />} />
        <Route path="/tech-woven/:id" element={<TechWovenDetail />} />
        <Route path="/luxury-covers/:id" element={<LuxuryCoverDetail />} />
        <Route path="/silicone-covers/:id" element={<SiliconeCoverDetail />} />
        <Route
          path="/leather-collection-magsafe/:id"
          element={<LeatherCollectionMagsafeDetail />}
        />
        <Route path="/carbon-covers/:id" element={<CarbonCoverDetail />} />
        <Route path="/baseball-knit/:id" element={<BaseballKnitDetail />} />
        <Route
          path="/metal-ring-leather/:id"
          element={<MetalRingLeatherDetail />}
        />

        {/* WATCH */}
        <Route path="/watch-straps" element={<WatchStraps />} />
        <Route path="/watch-cases" element={<WatchCases />} />
        <Route path="/watch-chargers" element={<WatchChargers />} />
        <Route path="/watch-straps/:id" element={<WatchStrapDetail />} />
        <Route path="/watch-cases/:id" element={<WatchCaseDetail />} />
        <Route path="/watch-chargers/:id" element={<WatchChargerDetail />} />

        {/* CHARGING */}
        <Route path="/power-bank" element={<PowerBank />} />
        <Route path="/car-accessories" element={<CarAccessories />} />
        <Route path="/adapters" element={<AdaptersPage />} />
        <Route
          path="/wireless-accessories"
          element={<WirelessAccessories />}
        />
        <Route path="/laptop-accessories" element={<LaptopAccessories />} />
        <Route path="/travel-accessories" element={<TravelAccessories />} />
        <Route path="/charging-cables" element={<ChargingCables />} />

        <Route path="/power-bank/:id" element={<PowerBankDetail />} />
        <Route path="/car-accessories/:id" element={<CarAccessoryDetail />} />
        <Route path="/adapters/:id" element={<AdapterDetail />} />
        <Route
          path="/laptop-accessories/:id"
          element={<LaptopAccessoryDetail />}
        />
        <Route
          path="/travel-accessories/:id"
          element={<TravelAccessoryDetail />}
        />
        <Route
          path="/charging-cables/:id"
          element={<ChargingCableDetail />}
        />
        <Route
          path="/wireless-accessories/:id"
          element={<WirelessAccessoryDetail />}
          
        />
        <Route path="/test-products" element={<TestProducts />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
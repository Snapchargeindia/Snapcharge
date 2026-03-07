import React from "react";
import { useParams } from "react-router-dom";
import {
  getWatchChargerById,
  getRelatedWatchChargers,
} from "./watchChargerData";
import ProductDetailLayout from "./ProductDetailLayout";

const WatchChargerDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getWatchChargerById(paramId);
  const related = product ? getRelatedWatchChargers(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "1 Meter Cable", price: product?.price ?? 999, mrp: product?.mrp ?? 1499 },
          { label: "2 Meter Cable", price: (product?.price ?? 999) + 100, mrp: (product?.mrp ?? 1499) + 100 },
          { label: "Magnetic Dock", price: (product?.price ?? 999) + 200, mrp: (product?.mrp ?? 1499) + 200 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/watch-chargers"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Variant"
      whyBuyLines={[
        "Premium quality watch chargers",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default WatchChargerDetail;
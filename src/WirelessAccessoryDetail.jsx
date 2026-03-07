import React from "react";
import { useParams } from "react-router-dom";
import {
  getWirelessAccessoryById,
  getRelatedWirelessAccessories,
} from "./wirelessAccessoriesData";
import ProductDetailLayout from "./ProductDetailLayout";

const WirelessAccessoryDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getWirelessAccessoryById(paramId);
  const related = product ? getRelatedWirelessAccessories(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "Standard Pad", price: product?.price ?? 1299, mrp: product?.mrp ?? 1899 },
          { label: "Magnetic", price: (product?.price ?? 1299) + 100, mrp: (product?.mrp ?? 1899) + 100 },
          { label: "Stand Charger", price: (product?.price ?? 1299) + 200, mrp: (product?.mrp ?? 1899) + 200 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/wireless-accessories"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Variant"
      whyBuyLines={[
        "Premium quality wireless accessories",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default WirelessAccessoryDetail;
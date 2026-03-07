import React from "react";
import { useParams } from "react-router-dom";
import {
  getChargingCableById,
  getRelatedChargingCables,
} from "./chargingCablesData";
import ProductDetailLayout from "./ProductDetailLayout";

const ChargingCableDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getChargingCableById(paramId);
  const related = product ? getRelatedChargingCables(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "Type-C", price: product?.price ?? 499, mrp: product?.mrp ?? 899 },
          { label: "Lightning", price: (product?.price ?? 499) + 50, mrp: (product?.mrp ?? 899) + 50 },
          { label: "Braided", price: (product?.price ?? 499) + 100, mrp: (product?.mrp ?? 899) + 100 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/charging-cables"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Variant"
      whyBuyLines={[
        "Premium quality charging cables",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default ChargingCableDetail;
import React from "react";
import { useParams } from "react-router-dom";
import {
  getAdapterById,
  getRelatedAdapters,
} from "./adapterData";
import ProductDetailLayout from "./ProductDetailLayout";

const AdapterDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getAdapterById(paramId);
  const related = product ? getRelatedAdapters(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "20W", price: product?.price ?? 999, mrp: product?.mrp ?? 1499 },
          { label: "35W", price: (product?.price ?? 999) + 100, mrp: (product?.mrp ?? 1499) + 100 },
          { label: "65W", price: (product?.price ?? 999) + 300, mrp: (product?.mrp ?? 1499) + 300 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/adapters"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Variant"
      whyBuyLines={[
        "Premium quality adapters",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default AdapterDetail;
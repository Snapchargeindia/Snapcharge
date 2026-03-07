import React from "react";
import { useParams } from "react-router-dom";
import {
  getCarAccessoryById,
  getRelatedCarAccessories,
} from "./carAccessoriesData";
import ProductDetailLayout from "./ProductDetailLayout";

const CarAccessoryDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getCarAccessoryById(paramId);
  const related = product ? getRelatedCarAccessories(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "Standard", price: product?.price ?? 799, mrp: product?.mrp ?? 1299 },
          { label: "Fast Charge", price: (product?.price ?? 799) + 100, mrp: (product?.mrp ?? 1299) + 100 },
          { label: "Magnetic", price: (product?.price ?? 799) + 200, mrp: (product?.mrp ?? 1299) + 200 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/car-accessories"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Variant"
      whyBuyLines={[
        "Premium quality car accessories",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default CarAccessoryDetail;
import React from "react";
import { useParams } from "react-router-dom";
import {
  getTravelAccessoryById,
  getRelatedTravelAccessories,
} from "./travelAccessoriesData";
import ProductDetailLayout from "./ProductDetailLayout";

const TravelAccessoryDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getTravelAccessoryById(paramId);
  const related = product ? getRelatedTravelAccessories(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "Standard", price: product?.price ?? 899, mrp: product?.mrp ?? 1399 },
          { label: "Pro Travel", price: (product?.price ?? 899) + 100, mrp: (product?.mrp ?? 1399) + 100 },
          { label: "Organizer Kit", price: (product?.price ?? 899) + 200, mrp: (product?.mrp ?? 1399) + 200 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/travel-accessories"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Variant"
      whyBuyLines={[
        "Premium quality travel accessories",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default TravelAccessoryDetail;
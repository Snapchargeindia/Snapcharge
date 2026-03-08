import React from "react";
import { useParams } from "react-router-dom";
import {
  getPremiumCoverById,
  getRelatedPremiumCovers,
} from "./premiumCoverData";
import ProductDetailLayout from "./ProductDetailLayout";

const PremiumCoverDetail = () => {
  const params = useParams();
  const paramId =
    params.id ||
    params.productId ||
    params.coverId ||
    params.slug ||
    Object.values(params)[0];

  const product = getPremiumCoverById(paramId);
  const related = getRelatedPremiumCovers(paramId, 4);

  const variants =
    product?.variants?.map((v) =>
      typeof v === "string"
        ? {
            label: v,
            price: product?.price ?? 0,
            mrp: product?.mrp ?? 0,
          }
        : {
            label: v.name || v.label,
            price: v.price ?? product?.price ?? 0,
            mrp: v.mrp ?? product?.mrp ?? 0,
            images: v.images || [],
            details: v.details,
            specs: v.specs,
          }
    ) || [];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/premium-covers"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Variant"
      colorOptions={product?.colors || []}
      whyBuyLines={[
        "Premium quality, device-specific fit",
        "Secure packaging to avoid transit damage",
        "Support for order, tracking & installation help",
      ]}
      enableBookNow={true}
      buildBuyNowData={(selected) => ({
        id: product?.id || product?._id || "",
        name: product?.name || "",
        image:
          selected?.selectedImage ||
          selected?.images?.[selected?.activeImage || 0] ||
          product?.images?.[0] ||
          "",
        price: selected?.selectedVariant?.price || product?.price || 0,
        quantity: 1,
        variant:
          selected?.selectedVariant?.label ||
          selected?.selectedVariant?.name ||
          selected?.selectedColor ||
          "Default",
        subtitle: product?.details || "",
      })}
    />
  );
};

export default PremiumCoverDetail;
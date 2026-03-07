import React from "react";
import { useParams } from "react-router-dom";
import {
  getPrintedCoverById,
  getRelatedPrintedCovers,
} from "./printedCoverData";
import ProductDetailLayout from "./ProductDetailLayout";

const PrintedCoverDetail = () => {
  const params = useParams();
  const paramId = params.id || params.productId || Object.values(params)[0];

  const product = getPrintedCoverById(paramId);
  const related = product ? getRelatedPrintedCovers(product.id) : [];

  const variants =
    product?.variants?.map((v, idx) => ({
      label: v.label || v.color || `Variant ${idx + 1}`,
      price: Number(v.price ?? product?.price ?? 0),
      mrp: Number(v.mrp ?? product?.mrp ?? 0),
      images: Array.isArray(v.images) ? v.images : product?.images || [],
      details: v.details || product?.details || "",
      specs: Array.isArray(v.specs) ? v.specs : product?.specs || [],
    })) || [];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/printed-covers"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Model"
      whyBuyLines={[
        "Premium quality printed covers",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default PrintedCoverDetail;
import React from "react";
import SectionHeading from "./SectionHeading";
import LoadingState from "./LoadingState";
import EmptyProducts from "@/features/products/components/EmptyProducts";
import ProductGrid from "./ProductGrid";

export default function NewArrivals({ loading, newProducts }) {
  return (
    <section className="mx-auto  px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Just added"
        title="New Arrivals"
        description="Fresh products recently added to our store."
        link="/products"
      />

      <div className="mt-8">
        {loading.getProducts ? (
          <LoadingState />
        ) : newProducts.length > 0 ? (
          <ProductGrid products={newProducts} />
        ) : (
          <EmptyProducts />
        )}
      </div>
    </section>
  );
}

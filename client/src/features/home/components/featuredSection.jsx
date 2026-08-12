import EmptyProducts from "@/features/products/components/EmptyProducts";
import SectionHeading from "./SectionHeading";
import LoadingState from "./LoadingState";
import ProductGrid from "./ProductGrid";

export default function FeaturedSection({ featuredProducts, loading }) {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto  px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Handpicked for you"
          title="Featured Products"
          description="Take a look at some of our popular products."
          link="/products"
        />

        <div className="mt-8">
          {loading.getProducts ? (
            <LoadingState />
          ) : featuredProducts.length > 0 ? (
            <ProductGrid products={featuredProducts} />
          ) : (
            <EmptyProducts />
          )}
        </div>
      </div>
    </section>
  );
}

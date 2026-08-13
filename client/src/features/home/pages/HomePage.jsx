import { useEffect, useMemo } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  CreditCard,
  Headphones,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Tablet,
  Watch,
  Laptop,
  Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ProductCard from "@/features/products/components/ProductCard";
import { useProduct } from "@/context/productContext";
import { Spinner } from "@/components/ui/spinner";
import HeroSection from "../components/HeroSection";
import CtegorysSection from "../components/CtegorysSection";
import FeaturedSection from "../components/featuredSection";
import PromotionalBaner from "../components/PromotionalBaner";
import NewArrivals from "../components/NewArrivals";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home() {
  const { products = [], loading, handelgetProducts } = useProduct();

  useEffect(() => {
    handelgetProducts();
  }, [handelgetProducts]);

  const featuredProducts = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  const newProducts = useMemo(() => {
    return [...products].reverse().slice(0, 4);
  }, [products]);

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />

      <CtegorysSection />

      <FeaturedSection loading={loading} featuredProducts={featuredProducts} />

      <PromotionalBaner />

      <NewArrivals loading={loading} newProducts={newProducts} />

      <WhyChooseUs />

      <section className="mx-auto  px-4 py-16  lg:px-0">
        <Card>
          <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <PackageCheck className="h-7 w-7 text-primary" />
            </div>

            <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to find your next favorite product?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Browse our products and discover something perfect for you.
            </p>

            <Button asChild size="lg" className="mt-7 w-full md:w-autocd">
              <Link to="/products" className="flex  items-center">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

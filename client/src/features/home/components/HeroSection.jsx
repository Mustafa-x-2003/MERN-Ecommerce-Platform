import {
  ArrowRight,
  CheckCircle2,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Star,
} from "lucide-react";

import { Link } from "react-router";
import Hero from "@/assets/Hero.png";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProduct } from "@/context/productContext";

export default function HeroSection() {
  const { setSearch } = useProduct();
  return (
    <section className="relative w-full overflow-hidden border-b bg-background">
      {/* ================= HERO ================= */}

      <div className="relative  px-4 py-10 sm:px-8 md:py-20 lg:px-0 ">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          {/* ================= CONTENT ================= */}

          <div className="relative z-10 max-w-2xl">
            <Badge
              variant="outline"
              className="mb-6  border-blue-500/40 bg-blue-500/5 px-4 py-3 text-xs text-blue-400"
            >
              <Star /> New collection
            </Badge>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Everything
              <br />
              you need,
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                all in one place.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Discover quality products, explore new arrivals, and enjoy a
              simple and convenient shopping experience.
            </p>

            {/* Buttons */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-7 text-white shadow-lg shadow-purple-500/20 hover:from-blue-600 hover:to-purple-600"
              >
                <Link onClick={()=>{
                  setSearch({})
                }} to="/products" className="flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Shop Now
                </Link>
              </Button>
              <a href="#categories" className="flex items-center">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 w-full   rounded-lg border-border/70 px-7"
                >
                  Explore Categories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            {/* Trust Items */}

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                Quality Products
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                Secure Checkout
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                Fast Delivery
              </div>
            </div>
          </div>

          {/* ================= HERO IMAGE ================= */}

          <div className="relative mx-auto w-full max-w-3xl lg:ml-auto">
            <div className="relative z-10">
              <img
                src={Hero}
                alt="NovaCart products"
                className="relative rounded-3xl z-10 w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>

        {/* ================= BENEFITS ================= */}

        <div className="relative z-20 mt-12 max-w-3xl rounded-2xl border bg-card/30 p-2 backdrop-blur-md sm:mt-14">
          <div className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {/* Quality */}

            <div className="flex items-center gap-4 p-4 sm:p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-background/60">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold">Quality Products</p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Carefully selected
                </p>
              </div>
            </div>

            {/* Secure */}

            <div className="flex items-center gap-4 p-4 sm:p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-background/60">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold">Secure Checkout</p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  100% protected
                </p>
              </div>
            </div>

            {/* Delivery */}

            <div className="flex items-center gap-4 p-4 sm:p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-background/60">
                <Truck className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold">Fast Delivery</p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Across the country
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

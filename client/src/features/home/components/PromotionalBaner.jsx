import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

import { Link } from "react-router";

export default function PromotionalBaner() {
  return (
    <section className="mx-auto  px-4 lg:px-0 py-16 ">
      <Card className="overflow-hidden border bg-primary text-primary-foreground">
        <CardContent className="relative p-8 sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[40px] border-primary-foreground/5" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <Badge variant="secondary" className="mb-4">
                Special Offer
              </Badge>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Find something you'll love.
              </h2>

              <p className="mt-3 text-sm leading-6 text-primary-foreground/80 sm:text-base">
                Explore our collection and discover great products at prices
                you'll love.
              </p>
            </div>

            <Button asChild size="lg" variant="secondary" className="shrink-0 w-full md:w-auto">
              <Link to="/products" className="flex items-center">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

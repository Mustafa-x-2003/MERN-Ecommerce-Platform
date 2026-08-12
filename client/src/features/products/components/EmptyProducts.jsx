import { PackageOpen, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EmptyProducts() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background  flex-1 max-w-full lg:min-w-300">
      <div className="mx-auto flex   items-center justify-center flex-1 ">
        <Card className="w-full overflow-hidden border-border shadow-sm flex-1 ">
          <CardContent className="flex flex-col items-center px-6 py-14 text-center sm:px-10 sm:py-20">
            {/* Products Icon */}
            <div className="relative mb-7">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <PackageOpen className="h-11 w-11 text-primary" />
              </div>

              <Badge variant="secondary" className="absolute -right-3 -top-2">
                No Products
              </Badge>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              No Products Available
            </h1>

            <p className="mt-4 max-w-md text-muted-foreground">
              Our store is currently empty. We&apos;re working on adding new
              products, so please check back soon.
            </p>

            {/* Action */}
            <Button size="lg" className="mt-8" onClick={() => navigate("/")}>
              <ShoppingBag className="mr-2 h-5 w-5" />
              Back to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {/* Small Hint */}
            <p className="mt-6 text-sm text-muted-foreground">
              New products will appear here as soon as they&apos;re available.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

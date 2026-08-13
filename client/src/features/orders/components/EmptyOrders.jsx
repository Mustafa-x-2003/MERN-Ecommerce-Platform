import { Package, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EmptyOrders() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background px-4 py-10 lg:px-0">
      <div className="mx-auto flex items-center justify-center">
        <Card className="w-full overflow-hidden border-border shadow-sm">
          <CardContent className="flex flex-col items-center px-6 py-14 text-center sm:px-10 sm:py-20">
            {/* Orders Icon */}
            <div className="relative mb-7">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <Package className="h-11 w-11 text-primary" />
              </div>

              <Badge variant="secondary" className="absolute -right-3 -top-2">
                No Orders
              </Badge>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              No Orders Yet
            </h1>

            <p className="mt-4 max-w-md text-muted-foreground">
              You haven&apos;t placed any orders yet. Explore our products and
              find something you&apos;ll love.
            </p>

            {/* Action */}
            <Button
              size="lg"
              className="mt-8"
              onClick={() => navigate("/products")}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {/* Small Hint */}
            <p className="mt-6 text-sm text-muted-foreground">
              Once you place an order, you&apos;ll be able to track and view its
              details here.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

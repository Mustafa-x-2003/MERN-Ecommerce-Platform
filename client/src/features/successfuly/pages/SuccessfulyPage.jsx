import {
  CheckCircle2,
  Package,
  ShoppingBag,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        {/* Success Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-11 w-11 text-primary" />
        </div>

        {/* Success Message */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Order Placed Successfully!
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Thank you for your order. We have received your order and will start
            processing it shortly.
          </p>
        </div>

        {/* Order Card */}
        <Card className="mt-8 w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>

              <div>
                <CardTitle className="text-lg">Order Details</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Your order has been successfully created.
                </p>
              </div>
            </div>

            <Badge variant="secondary">Order Placed</Badge>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>

                <p className="mt-1 break-all font-semibold text-foreground">
                  #{id.slice(-10) || "N/A"}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Order received</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="mt-4 w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ClipboardList className="h-5 w-5 text-primary" />
              What&apos;s next?
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-muted/50 p-4">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-background">
                  <Package className="h-4 w-4 text-primary" />
                </div>

                <h3 className="font-medium text-foreground">
                  Track your order
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  View your order details and track its current status.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-muted/50 p-4">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-background">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                </div>

                <h3 className="font-medium text-foreground">Keep shopping</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Discover more products and continue shopping.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8 flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => navigate("/products")}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Continue Shopping
          </Button>

          <Button
            size="lg"
            className="w-full sm:w-auto"
            disabled={!id}
            onClick={() => navigate(`/orderDetails/${id}`)}
          >
            <Package className="mr-2 h-5 w-5" />
            View My Order
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Footer Message */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          You can always find your orders from your account.
        </p>
      </div>
    </main>
  );
}

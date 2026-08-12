import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  CreditCard,
  MapPin,
  Package,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router";

export default function OrderCard({ order }) {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const orderId = order._id.slice(-6).toUpperCase();

  const statusVariant = {
    pending: "secondary",
    processing: "default",
    shipped: "default",
    delivered: "default",
    cancelled: "destructive",
  };

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
        <div>
          <CardTitle className="text-base">Order #{orderId}</CardTitle>

          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <Badge variant={statusVariant[order.orderStatus] || "secondary"}>
          {order.orderStatus}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Order summary */}
        <div className="flex flex-col  gap-5 sm:flex-row sm:justify-between sm:items-center  ">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-muted p-2">
              <Package className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Items</p>
              <p className="font-medium">{order.items.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-muted p-2">
              <CreditCard className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Payment</p>
              <p className="font-medium uppercase">{order.paymentMethod}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Total</p>

            <p className="text-lg font-bold">
              {order.totalPrice.toLocaleString()} EGP
            </p>
          </div>
        </div>

        {/* Payment status */}
        <div className=" sm:hidden  flex items-center justify-between border-t pt-4">
          <span className="text-sm text-muted-foreground">Payment Status</span>

          <Badge
            variant={order.paymentStatus === "paid" ? "default" : "secondary"}
          >
            {order.paymentStatus}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end sm:justify-between  border-t bg-muted/20">
        <div className="hidden sm:flex   items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Payment Status</span>

          <Badge
            variant={order.paymentStatus === "paid" ? "default" : "secondary"}
          >
            {order.paymentStatus}
          </Badge>
        </div>
        <Link to={`/orderDetails/${order._id}`}>
          <Button variant="ghost">
            View Details
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

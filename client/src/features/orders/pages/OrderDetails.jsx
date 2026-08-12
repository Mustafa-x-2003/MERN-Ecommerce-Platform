import React, { useEffect } from "react";

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
import { useOrders } from "@/context/ordersContext";
import { Link, useParams } from "react-router";
import OrderProgress from "../components/OrderProgress";

export default function OrderDetails() {
  const { id } = useParams();

  const { order, loading, handelGetOrder } = useOrders();

  useEffect(() => {
    handelGetOrder(id);
  }, [id, handelGetOrder]);
  if (!order || loading.order) {
    return <p>Loading</p>;
  }

  const formattedDate = new Date(order?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const orderId = id.slice(-6).toUpperCase();

  const statusVariant = {
    pending: "secondary",
    processing: "default",
    shipped: "default",
    delivered: "default",
    cancelled: "destructive",
  };

  return (
    <div className="py-10 px-4 lg:px-0">
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

        <CardContent className="space-y-6">
          {/* Order summary */} 
          <div className={order.orderStatus === 'cancelled'?'hidden':''}>
            <OrderProgress status={order.orderStatus}/>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row   sm:justify-between sm:items-center">
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

          <div className="flex flex-col md:flex-row justify-between gap-5 ">
            {/* Shipping */}
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />

                <h3 className="text-sm font-semibold">Shipping Address</h3>
              </div>

              <div className="text-sm flex flex-col gap-4 pt-4 text-muted-foreground">
                <p>Name : {order.shippingAddress.name}</p>
                <p>Phone : {order.shippingAddress.phone}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.country}
                </p>
                <p>
                  Street : {order.shippingAddress.street},
                  {order.shippingAddress.building}
                </p>
                <p>Building : {order.shippingAddress.building}</p>
              </div>
            </div>
            {/* Items */}
            <div className="flex-1 rounded-lg bg-muted/50 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Package className="h-4 w-4" />
                <h3 className="text-sm font-semibold">Order Items</h3>
              </div>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.product}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>

                      <p className="text-sm text-muted-foreground">
                        {item.quantity} × {item.price.toLocaleString()} EGP
                      </p>
                    </div>

                    <p className="font-semibold">
                      {(item.price * item.quantity).toLocaleString()} EGP
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment status */}
          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-sm text-muted-foreground">
              Payment Status
            </span>

            <Badge
              variant={order.paymentStatus === "paid" ? "default" : "secondary"}
            >
              {order.paymentStatus}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="justify-end border-t bg-muted/20">
          <Link to={"/orders"}>
            <Button variant="ghost">
              Back
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

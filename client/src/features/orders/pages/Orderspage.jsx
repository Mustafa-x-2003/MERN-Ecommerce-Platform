import { useOrders } from "@/context/ordersContext";
import React from "react";
import OrderCard from "../components/OrderCard";
import OrderSkeleton from "../components/OrderSkeleton";
import EmptyOrders from "../components/EmptyOrders";

export default function Orderspage() {
  const { orders, loading } = useOrders();

  if (orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <div className="py-10 px-4 md:px-0">
      <div className="grid lg:grid-cols-2 gap-5">
        {loading.orders
          ? Array.from({ length: 4 }).map((order, i) => {
              return <OrderSkeleton key={i} />;
            })
          : orders.map((order) => {
              return <OrderCard key={order._id} order={order} />;
            })}
      </div>
    </div>
  );
}

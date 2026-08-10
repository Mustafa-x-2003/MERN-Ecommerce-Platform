import React from "react";
import {
  ShoppingBag,
} from "lucide-react";
export default function OrederSamary({ cart , handleSubmit }) {
  let subtotal = cart.reduce((acc, curr) => acc + curr.product.price, 0);
  let discount = cart.reduce((acc, curr) => acc + curr.product.discount, 0);
  let total = subtotal - (discount / 100 * subtotal);

  return (
   
      <aside className=" min-w-90 lg:col-span-1 sticky top-20 lg:mt-[95.99px]">
        <div className=" rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cart?.map((item) => {
              const product = item.product;

              return (
                <div key={product?._id} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={product?.images?.[0]}
                      alt={product?.name}
                      className="h-full w-full object-cover"
                    />

                    <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-xs text-background">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {product?.name}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {product?.price?.toLocaleString()} EGP
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-foreground">
                    {(product?.price * item.quantity)?.toLocaleString()} EGP
                  </p>
                </div>
              );
            })}
          </div>

          <div className="my-6 border-t border-border" />

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>

              <span className="font-medium text-foreground">
                {subtotal?.toLocaleString() || 0} EGP
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>

              <span className="font-medium text-foreground">Free</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>

                <span className="font-medium text-green-600 dark:text-green-500">
                  -{discount.toLocaleString()}% EGP
                </span>
              </div>
            )}
          </div>

          <div className="my-6 border-t border-border" />

          <div className="flex mb-5 items-center justify-between">
            <span className="text-lg font-semibold text-foreground">Total</span>

            <span className="text-xl font-bold text-primary">
              {total?.toLocaleString() || 0} EGP
            </span>
          </div>

          <button
          onClick={handleSubmit}
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag className="h-5 w-5" />
            Place Order
          </button>
        </div>
      </aside>
    
  );
}

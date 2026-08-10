import React from "react";
import { CreditCard, Check } from "lucide-react";
export default function Payment() {
  return (
    <div>
      <section className="rounded-2xl w-full border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Payment Method
            </h2>

            <p className="text-sm text-muted-foreground">
              Choose your preferred payment method
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition border-primary bg-primary/5 ring-2 ring-primary/20"
 
            `}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg border border-border text-primary-foreground"`}
              >
                <CreditCard />
              </div>

              <div>
                <h2 className="font-medium text-foreground">
                  Cash on Delivery
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Pay when you receive your order
                </p>
              </div>
            </div>

            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${"border-primary bg-primary text-primary-foreground"}`}
            >
              <Check className="h-3 w-3" />
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}

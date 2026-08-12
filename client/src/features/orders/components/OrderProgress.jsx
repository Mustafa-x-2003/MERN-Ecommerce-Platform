import { Badge } from "@/components/ui/badge";
import { Divide } from "lucide-react";
import React from "react";
import {
  FiClock,
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiHome,
} from "react-icons/fi";

const STEPS = [
  { key: "pending", label: "Pending", icon: FiClock },
  { key: "confirmed", label: "Confirmed", icon: FiCheckCircle },
  { key: "processing", label: "Processing", icon: FiPackage },
  { key: "shipped", label: "Shipped", icon: FiTruck },
  { key: "delivered", label: "Delivered", icon: FiHome },
];

export default function OrderProgress({ status }) {
  console.log(status);

  const currentIndex = STEPS.findIndex((step) => step.key === status);

  const isCancelledOrReturned = status === "cancelled" || status === "returned";

  return (
    <div className="w-full ">
      {!isCancelledOrReturned && (
        <div>
          <h3 className="mb-4 text-sm font-semibold">Progress</h3>
          <div className="flex items-center">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentIndex;
              const isLast = index === STEPS.length - 1;

              return (
                <div
                  key={step.key}
                  className="flex flex-1 items-center last:flex-none"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon size={18} />
                    </div>

                    <span
                      className={`mt-2 whitespace-nowrap text-xs font-medium ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {!isLast && (
                    <div
                      className={`mx-2 mb-5 h-0.5 flex-1 transition-colors ${
                        index < currentIndex ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

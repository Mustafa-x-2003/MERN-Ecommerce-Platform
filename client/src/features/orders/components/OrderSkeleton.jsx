import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function OrderSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
        <div className="space-y-2">
          {/* Order ID */}
          <Skeleton className="h-5 w-32" />

          {/* Date */}
          <Skeleton className="h-4 w-40" />
        </div>

        {/* Order Status */}
        <Skeleton className="h-6 w-20 rounded-full" />
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-6 pt-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Items */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-lg" />

            <div className="space-y-2">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>

          {/* Payment */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-lg" />

            <div className="space-y-2">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          {/* Total */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-6 w-28" />
          </div>
        </div>

        {/* Payment Status - Mobile */}
        <div className="flex items-center justify-between border-t pt-4 sm:hidden">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-end border-t bg-muted/20 sm:justify-between">
        {/* Payment Status - Desktop */}
        <div className="hidden items-center justify-between gap-4 sm:flex">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* View Details */}
        <Skeleton className="h-9 w-28" />
      </CardFooter>
    </Card>
  );
}

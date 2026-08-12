import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden w-70">
      {/* Image */}
      <Skeleton className="aspect-square w-full rounded-none" />

      <CardContent className="space-y-3 p-4">
        {/* Product name */}
        <Skeleton className="h-5 w-3/4" />

        {/* Rating */}
        <Skeleton className="h-4 w-1/2" />

        {/* Price */}
        <Skeleton className="h-5 w-1/3" />
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Button */}
        <Skeleton className="h-10 mt-4 w-full" />
      </CardFooter>
    </Card>
  );
}

import { useWishlist } from "@/context/wishlistContext";
import React from "react";
import { ShoppingCart, Star, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";
import EmptyWishlist from "../components/EmptyWishlist";
import ProductCard from "@/features/products/components/ProductCard";
export default function WishlistPage() {
  const { wishlist, handleDeleteFromWishlist } = useWishlist();
  const { handleAddCart } = useCart();

  if (!wishlist || wishlist.length === 0) {
    return <EmptyWishlist />;
  }
  return (
    <div className="py-10 px-4 md:px-0">
      <Card>
        <CardHeader className={"flex justify-between items-center"}>
          <CardTitle>Your Wishlist</CardTitle>

          <Button variant="destructive">delete all</Button>
        </CardHeader>
        <CardContent className={"overflow-hidden py-2 "}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((product) => (
              <ProductCard product={product} />
              // <Card
              //   key={product._id}
              //   className="group overflow-hidden rounded-2xl border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              // >
              //   <CardHeader className="relative p-0">
              //     {/* Discount */}
              //     {product.discount > 0 && (
              //       <span className=" absolute left-3 top-3 z-10 rounded-full bg-destructive px-3 py-1  text-xs  font-semibold  text-destructive-foreground">
              //         -{product.discount}%
              //       </span>
              //     )}

              //     {/* Image */}
              //     <div className="aspect-square overflow-hidden bg-muted">
              //       {product.images?.length > 0 && (
              //         <img
              //           src={product.images[0]}
              //           alt={product.name}
              //           className="h-full w-full object-cover transition  duration-500 group-hover:scale-110 "
              //         />
              //       )}
              //     </div>
              //   </CardHeader>

              //   <CardContent className="flex flex-col justify-between h-full  p-5">
              //     <h3 className=" line-clamp-1 text-lg font-semibold ">
              //       {product.name}
              //     </h3>

              //     <p className=" line-clamp-2 text-sm text-muted-foreground ">
              //       {product.description}
              //     </p>

              //     <div className="flex items-center justify-between">
              //       <span className="text-xl font-bold">${product.price}</span>

              //       <div className="flex items-center gap-1">
              //         <Star className="h-4 w-4 fill-current text-yellow-500" />

              //         <span className="text-sm font-medium">
              //           {product.ratings?.average || 0}
              //         </span>
              //       </div>
              //     </div>
              //   </CardContent>

              //   <CardFooter>
              //     <div className="flex w-full items-center justify-between gap-2">
              //       <Button
              //         onClick={() => {
              //           handleAddCart(product._id);
              //         }}
              //         className=" w-full flex-1  rounded-xl gap-2  transition  hover:scale-[1.02] "
              //       >
              //         <ShoppingCart className="h-4 w-4" />
              //         Add to Cart
              //       </Button>

                    // <Button
                    //   onClick={async () => {
                    //     await handleDeleteFromWishlist(product._id);
                    //   }}
                    //   variant="destructive"
                    // >
                    //   <Trash2 />
                    // </Button>
              //     </div>
              //   </CardFooter>
              // </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

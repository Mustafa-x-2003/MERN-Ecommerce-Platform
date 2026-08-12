import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, ShoppingCart, Star, CircleCheckBig } from "lucide-react";
import { useCart } from "@/context/cartContext";
import { useWishlist } from "@/context/wishlistContext";
import { Link } from "react-router";
import { useCallback } from "react";

export default function ProductCard({ product }) {
  const { handleAddCart, cart } = useCart();
  const { handleAddToWishlist, handleDeleteFromWishlist, wishlist } =
    useWishlist();

  console.log(wishlist);
  const isInCart = useCallback(
    (id) => {
      return cart.some((item) => item.product._id === id);
    },
    [cart],
  );
  const isWishlist = useCallback(
    (id) => {
      return wishlist.some((product) => product._id === id);
    },
    [wishlist],
  );

  return (
    <Card
      key={product._id}
      className="group cursor-pointer overflow-hidden rounded-2xl border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <CardHeader className="relative p-0">
        {/* Wishlist */}
        <Button
          onClick={() => {
            if (isWishlist(product._id)) {
              handleDeleteFromWishlist(product._id);
            } else {
              handleAddToWishlist(product._id);
            }
          }}
          size="icon"
          variant="secondary"
          className="  absolute  right-3   top-3   z-10  h-9  w-9  rounded-full  opacity-90   shadow-md   transition  hover:scale-110 "
        >
          <Heart
            className={`h-5 w-5 ${isWishlist(product._id) ? "text-red-600" : ""} `}
          />
        </Button>

        {/* Discount */}
        {product.discount > 0 && (
          <span className=" absolute left-3 top-3 z-10 rounded-full bg-destructive px-3 py-1  text-xs  font-semibold  text-destructive-foreground">
            -{product.discount}%
          </span>
        )}

        {/* Image */}
        <Link to={`/productDetails/${product._id}`}>
          <div className="aspect-square overflow-hidden bg-muted">
            {product.images?.length > 0 && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover transition  duration-500 group-hover:scale-110 "
              />
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-full  p-5">
        <h3 className=" line-clamp-1 text-lg font-semibold ">{product.name}</h3>

        <p className=" line-clamp-2 text-sm text-muted-foreground ">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">${product.price}</span>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current text-yellow-500" />

            <span className="text-sm font-medium">
              {product.ratings?.average || 0}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant={`${isInCart(product._id) ? "outline" : ""}`}
          disabled={isInCart(product._id)}
          onClick={() => {
            handleAddCart(product._id);
          }}
          className=" w-full  rounded-xl gap-2  transition  hover:scale-[1.02] "
        >
          {isInCart(product._id) ? (
            <CircleCheckBig className="h-4 w-4" />
          ) : (
            <ShoppingCart className="h-4 w-4" />
          )}
          {isInCart(product._id) ? "Product in Cart" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}

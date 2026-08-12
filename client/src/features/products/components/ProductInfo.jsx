import { useCallback, useMemo, useState } from "react";
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useCart } from "@/context/cartContext";
import { useWishlist } from "@/context/wishlistContext";

export default function ProductInfo({ product }) {
  const { cart, loading, handleAddCart } = useCart();

  const { wishlist, handleAddToWishlist, handleDeleteFromWishlist } =
    useWishlist();

  // const [quantity, setQuantity] = useState(1);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const { _id, name, description, price, discount, stock, ratings } = product;
  console.log(_id, name, description, price, discount, stock, ratings);

  /*
   * Check if the product already exists in cart
   */
  const cartItem = useMemo(() => {
    return cart?.find((item) => item.product?._id === _id);
  }, [cart, _id]);

  const isInCart = Boolean(cartItem);

  /*
   * Check if the product exists in wishlist
   */
  const isInWishlist = useMemo(() => {
    return wishlist?.some((item) => item._id === _id);
  }, [wishlist, _id]);

  /*
   * Calculate final price
   */
  const finalPrice = useMemo(() => {
    if (!discount) return price;

    return price - (price * discount) / 100;
  }, [price, discount]);

  /*
   * Quantity displayed in UI
   *
   * Before adding to cart:
   * local quantity
   *
   * After adding:
   * cart quantity
   */
  // const currentQuantity = cartItem?.quantity ?? quantity;

  /*
   * Increase quantity
   */
  // const handleIncreaseQuantity = useCallback(async () => {
  //   if (currentQuantity >= stock) return;

  //   if (isInCart) {
  //     await handleUpdateCartQuantity({
  //       _id,
  //       quantity: currentQuantity + 1,
  //     });

  //     return;
  //   }

  //   setQuantity((prev) => prev + 1);
  // }, [currentQuantity, stock, isInCart, handleUpdateCartQuantity, _id]);

  /*
   * Decrease quantity
   */
  // const handleDecreaseQuantity = useCallback(async () => {
  //   if (currentQuantity <= 1) return;

  //   if (isInCart) {
  //     await handleUpdateCartQuantity({
  //       _id,
  //       quantity: currentQuantity - 1,
  //     });

  //     return;
  //   }

  //   setQuantity((prev) => prev - 1);
  // }, [currentQuantity, isInCart, handleUpdateCartQuantity, _id]);

  /*
   * Add product to cart
   */
  const handleAddProductToCart = useCallback(async () => {
    if (stock <= 0 || isInCart) return;

    await handleAddCart(_id);
  }, [stock, isInCart, handleAddCart, _id]);

  /*
   * Toggle wishlist
   */
  const handleWishlist = useCallback(async () => {
    try {
      setWishlistLoading(true);

      if (isInWishlist) {
        await handleDeleteFromWishlist(_id);
      } else {
        await handleAddToWishlist(_id);
      }
    } finally {
      setWishlistLoading(false);
    }
  }, [isInWishlist, handleDeleteFromWishlist, handleAddToWishlist, _id]);

  return (
    <div className="flex flex-col">
      {/* Product Name */}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{name}</h1>

      {/* Rating */}
      <div className="mt-4 flex items-center gap-2">
        {ratings?.count > 0 ? (
          <>
            <div className="flex items-center gap-1">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />

              <span className="font-medium">{ratings.average.toFixed(1)}</span>
            </div>

            <span className="text-sm text-muted-foreground">
              ({ratings.count} reviews)
            </span>
          </>
        ) : (
          <span className="text-sm text-muted-foreground">No reviews yet</span>
        )}
      </div>

      <Separator className="my-5" />

      {/* Description */}
      <p className="max-w-xl leading-7 text-muted-foreground">{description}</p>

      {/* Price */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-3xl font-bold">
          EGP {finalPrice?.toLocaleString()}
        </span>

        {discount > 0 && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              EGP {price?.toLocaleString()}
            </span>

            <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-semibold text-destructive">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Stock */}
      <div className="mt-6">
        {stock === 0 ? (
          <span className="font-medium text-destructive">Out of stock</span>
        ) : stock <= 5 ? (
          <span className="font-medium text-orange-500">
            Only {stock} left in stock
          </span>
        ) : (
          <span className="font-medium text-green-600 dark:text-green-500">
            In stock · {stock} available
          </span>
        )}
      </div>

      <Separator className="my-6" />

      
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          variant={isInCart? "secondary" :"default" }
          size="lg"
          className="flex-1"
          disabled={stock <= 0 || isInCart || loading.getCart}
          onClick={handleAddProductToCart}
        >
          <ShoppingCart className="mr-2" size={18} />

          {loading.getCart
            ? "Adding..."
            : isInCart
              ? "Added to Cart"
              : "Add to Cart"}
        </Button>

        <Button
          size="lg"
          variant={isInWishlist ? "default" : "outline"}
          className="sm:w-auto"
          disabled={wishlistLoading}
          onClick={handleWishlist}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} className={isInWishlist ? "fill-current" : ""} />

          <span className="ml-2 sm:hidden">
            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </span>
        </Button>
      </div>
    </div>
  );
}

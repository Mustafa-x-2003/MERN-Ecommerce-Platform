import React, { memo } from "react";
import { useProduct } from "@/context/productContext";
import { useCart } from "@/context/cartContext";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useWishlist } from "@/context/wishlistContext";
function ProductsPage() {
  const { products, search, setSearch, categories } = useProduct();
  const { handleAddCart } = useCart();
  const { handleAddToWishlist } = useWishlist();

  return (
    <div className=" px-4 md:px-0 py-10 flex  gap-5">
      <Card className="rounded-2xl h-fit max-w-70 hidden lg:block border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>

          <p className="text-sm text-muted-foreground">
            Filter products based on your preferences
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Category</h3>

            <RadioGroup
              value={search.category}
              onValueChange={(value) =>
                setSearch((prev) => ({
                  ...prev,
                  category: value,
                }))
              }
              className="space-y-1"
            >
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="
              flex
              items-center
              gap-3
              rounded-lg
              px-3
              py-2
              transition
              hover:bg-muted
            "
                >
                  <RadioGroupItem value={category._id} id={category._id} />

                  <Label
                    htmlFor={category._id}
                    className="
                cursor-pointer
                text-sm
                font-normal
              "
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Price Range</h3>

            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min price"
                value={search.minPrice}
                onChange={(e) =>
                  setSearch((prev) => ({
                    ...prev,
                    minPrice: e.target.value,
                  }))
                }
              />

              <Input
                type="number"
                placeholder="Max price"
                value={search.maxPrice}
                onChange={(e) =>
                  setSearch((prev) => ({
                    ...prev,
                    maxPrice: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              setSearch({
                name: "",
                category: "",
                minPrice: "",
                maxPrice: "",
              })
            }
            className="w-full rounded-xl"
          >
            Reset
          </Button>
        </CardContent>
      </Card>
      {/* ============================ */}
      <div className="">
        <div className="mb-6 space-y-4 lg:hidden">
          {/* Search + Category */}
          <div className="flex gap-3">
            <Input
              value={search.name}
              onChange={(e) =>
                setSearch((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Search products..."
              className="h-10 flex-1"
            />

            <Select
              value={search.category}
              onValueChange={(value) =>
                setSearch((prev) => ({
                  ...prev,
                  category: value,
                }))
              }
            >
              <SelectTrigger className="h-10 w-[150px]">
                <SelectValue>
                  {categories.find(
                    (category) => category._id === search.category,
                  )?.name || "Category"}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>

                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Min price"
              value={search.minPrice}
              onChange={(e) =>
                setSearch((prev) => ({
                  ...prev,
                  minPrice: e.target.value,
                }))
              }
            />

            <Input
              type="number"
              placeholder="Max price"
              value={search.maxPrice}
              onChange={(e) =>
                setSearch((prev) => ({
                  ...prev,
                  maxPrice: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product._id}
              className="group overflow-hidden rounded-2xl border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardHeader className="relative p-0">
                {/* Wishlist */}
                <Button
                  onClick={() => {
                    handleAddToWishlist(product._id);
                  }}
                  size="icon"
                  variant="secondary"
                  className="  absolute  right-3   top-3   z-10  h-9  w-9  rounded-full  opacity-90   shadow-md   transition  hover:scale-110 "
                >
                  <Heart className="h-5 w-5" />
                </Button>

                {/* Discount */}
                {product.discount > 0 && (
                  <span className=" absolute left-3 top-3 z-10 rounded-full bg-destructive px-3 py-1  text-xs  font-semibold  text-destructive-foreground">
                    -{product.discount}%
                  </span>
                )}

                {/* Image */}
                <div className="aspect-square overflow-hidden bg-muted">
                  {product.images?.length > 0 && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition  duration-500 group-hover:scale-110 "
                    />
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex flex-col justify-between h-full  p-5">
                <h3 className=" line-clamp-1 text-lg font-semibold ">
                  {product.name}
                </h3>

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
                  onClick={() => {
                    handleAddCart(product._id);
                  }}
                  className=" w-full  rounded-xl gap-2  transition  hover:scale-[1.02] "
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default memo(ProductsPage);

import React, { memo, useCallback } from "react";
import { useProduct } from "@/context/productContext";
import { useCart } from "@/context/cartContext";
import { Search } from "lucide-react";

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

import ProductCardSkeleton from "../components/ProductCardSkeleton";
import ProductCard from "../components/ProductCard";
import EmptyProducts from "../components/EmptyProducts";
function ProductsPage() {
  const { products, loading, search, setSearch, categories } = useProduct();
  const { cart } = useCart();

  const isInCart = useCallback(
    (id) => {
      console.log(id);

      return cart.some((item) => item.product._id === id);
    },
    [cart],
  );
  if (!products) {
    return <EmptyProducts />;
  }

  return (
    <div className=" px-4 md:px-0 py-10 flex justify-center lg:justify-start gap-5">
      <Card className="rounded-2xl h-fit min-w-70 max-w-70 hidden  lg:block border-border bg-card shadow-sm ">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>

          <p className="text-sm text-muted-foreground">
            Filter products based on your preferences
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className=" my-4 flex relative items-center">
            <Input
              value={search.name}
              className={"h-10 px-3"}
              onChange={(e) => {
                setSearch({ ...search, name: e.target.value });
              }}
              id="name"
              type="text"
              placeholder="Search..."
              required
            />
            <span className=" absolute right-3">
              <Search size={18} />
            </span>
          </div>
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
        {products.length === 0 ? (
          <EmptyProducts />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                // isInCart={isInCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default memo(ProductsPage);

import React, { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/cartContext";
// icons
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
// icons

export default function CartPage() {
  const { cart, loading, handleDeleteFromCart, handleUpdateCartQuantity } =
    useCart();

  const handleQuantity = useCallback(
    async (value) => {
      await handleUpdateCartQuantity(value);
    },
    [handleUpdateCartQuantity],
  );
  const handleDeletProduct = useCallback(
    async (id) => {
      await handleDeleteFromCart(id);
    },
    [handleDeleteFromCart],
  );

  let Suptotal = 0;
  cart.forEach((ele) => {
    Suptotal += ele.product.price * ele.quantity;
  });

  let estimated = "5";
  let TotalPrice = Suptotal - (estimated / 100) * Suptotal;

  return (
    <div className=" px-4 md:px-0 py-10">
      <div className=" flex flex-col  md:flex-row justify-between gap-5">
        <Card className={"flex-1"}>
          <CardHeader>
            <CardTitle>Your Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              {cart.map((item) => {
                return (
                  <div
                    key={item.product.name}
                    className=" border-t h-30  py-4 border-border flex gap-4 "
                  >
                    <span className=" w-25 overflow-hidden  flex justify-between items-center">
                      <img
                        src={item.product?.images?.[0]}
                        alt=""
                        className="full"
                      />
                    </span>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h2 className="flex items-center justify-between">
                          <span>{item.product.name}</span>{" "}
                          <span>${item.product.price}</span>
                        </h2>
                      </div>
                      {/* ===================== */}
                      <div className="flex justify-between items-center">
                        <div className=" flex border items-center rounded-lg gap-1 w-fit px- py- border-border">
                          <Button
                            variant="ghost"
                            onClick={() => {
                              handleQuantity({
                                _id: item.product._id,
                                quantity: item.quantity - 1,
                              });
                            }}
                            className="px-1"
                          >
                            {<Minus size={16} />}{" "}
                          </Button>

                          <span className="min-w-2 text-center">
                            {" "}
                            {item.quantity}{" "}
                          </span>

                          <Button
                            variant="ghost"
                            onClick={() => {
                              handleQuantity({
                                _id: item.product._id,
                                quantity: item.quantity + 1,
                              });
                            }}
                            className="px-1"
                          >
                            {<Plus size={16} />}
                          </Button>
                        </div>

                        <Button
                          onClick={() => {
                            handleDeletProduct(item.product._id);
                          }}
                          variant="destructive"
                          className={"py-1"}
                          icon={<Trash2 />}
                        ></Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <div className=" md:w-[40%] lg:w-[30%] ">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col justify-between gap-4">
                  <h2 className="flex justify-between items-center gap-4">
                    <span>Suptotal:</span>
                    <span>${Suptotal}</span>
                  </h2>
                  <h2 className="flex justify-between items-center gap-4">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </h2>
                  <h2 className="flex justify-between items-center gap-4">
                    <span>Estimated Tax:</span>
                    <span>%{estimated}</span>
                  </h2>
                </div>
                <span className="block border-t border-border"></span>
                <div className="flex flex-col justify-between gap-4">
                  <h2 className="flex justify-between items-center gap-4">
                    <span>Total Price:</span>
                    <span>${TotalPrice}</span>
                  </h2>
                  <div className="flex  justify-between gap-2">
                    <Link to={"/"} className="  flex-1">
                      <Button className={"w-full "}>Proceed to Checkout</Button>
                    </Link>
                    <Link className="flex-1" to={"/products"}>
                      <Button className={"w-full"} variant="outline">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

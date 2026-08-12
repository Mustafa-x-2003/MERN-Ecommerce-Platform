import { Button } from "@/components/ui/button";
import React, { memo, useCallback } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/cartContext";
function CartItem({ item }) {
  const { loading, handleDeleteFromCart, handleUpdateCartQuantity } = useCart();

  // deleteFromCart: false,
  // quantity: false,

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
  if (loading.quantity) {
    // return <p>Loading</p>;
  }

  return (
    <div className=" border-t h-30  py-4 border-border flex gap-4 ">
      <span className=" w-25 overflow-hidden  flex justify-between items-center">
        <img src={item.product?.images?.[0]} alt="" className="full" />
      </span>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="flex items-center justify-between">
            <span>{item.product.name}</span> <span>${item.product.price}</span>
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

            <span className="min-w-2 text-center"> {item.quantity} </span>

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
}
export default memo(CartItem);

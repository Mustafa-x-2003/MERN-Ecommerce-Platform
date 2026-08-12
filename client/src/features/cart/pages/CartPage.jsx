import { memo, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/cartContext";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import EmptyCart from "../components/EmptyCart";
import { Button } from "@/components/ui/button";

function CartPage() {
  const { cart, loading } = useCart();

  const { Suptotal, estimated, TotalPrice } = useMemo(() => {
    const estimated = "5";
    const Suptotal = cart.reduce(
      (total, ele) => total + ele.product.price * ele.quantity,
      0,
    );

    const TotalPrice = Suptotal - (estimated / 100) * Suptotal;

    return { estimated, Suptotal, TotalPrice };
  }, [cart]);
  if (loading.getCart) {
    return <p>Loading</p>;
  }
  if (!cart || cart.length === 0) {
    return <EmptyCart/>;
  }
  return (
    <div className=" px-4 md:px-0 py-10">
      <div className=" flex flex-col  md:flex-row justify-between gap-5">
        <Card className={"flex-1 h-fit"}>
          <CardHeader className={'flex justify-between items-center'}>
            <CardTitle>Your Selection</CardTitle>
            <Button variant="destructive">delete all</Button>
          </CardHeader>
          <CardContent className={""}>
            <div>
              {cart.map((item) => {
                return <CartItem key={item.product._id} item={item} />;
              })}
            </div>
          </CardContent>
        </Card>
        {/* ======================= */}
        <div className=" md:w-[30%] lg:w-[25%] ">
          <OrderSummary
            Suptotal={Suptotal}
            estimated={estimated}
            TotalPrice={TotalPrice}
          />
        </div>
      </div>
    </div>
  );
}
export default memo(CartPage);


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { memo } from "react";
import { Link } from "react-router";

 function OrderSummary({ Suptotal, estimated, TotalPrice }) {
  return (
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
              <span>{estimated}%</span>
            </h2>
          </div>
          <span className="block border-t border-border"></span>
          <div className="flex flex-col justify-between gap-4">
            <h2 className="flex justify-between items-center gap-4">
              <span>Total Price:</span>
              <span>${TotalPrice}</span>
            </h2>
            <div className="flex flex-col  justify-between gap-2">
              <Link to={"/checkout"} className="  flex-1">
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
  );
}
export default memo(OrderSummary)
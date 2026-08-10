import { useEffect, useState } from "react";
import { CreditCard, Banknote } from "lucide-react";
import { useAddresses } from "@/context/addressesContext";
import { useOrders } from "@/context/ordersContext";
import FormCheckout from "../components/FormCheckout";
import Payment from "../components/Payment";
import OrederSamary from "../components/OrederSamary";
import { useCart } from "@/context/cartContext";

export default function CheckoutPage() {
  const { defaultAddress, handleGetDefaultAddress } = useAddresses();
  const { handelCreateOrder } = useOrders();
  const { cart } = useCart();
  console.log(cart);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    building: "",
    apartment: "",
    postalCode: "",
  });

  useEffect(() => {
    handleGetDefaultAddress();
  }, [handleGetDefaultAddress]);

  useEffect(() => {
    if (!defaultAddress) return;

    setFormData({
      name: defaultAddress?.name || "",
      phone: defaultAddress?.phone || "",
      country: defaultAddress?.country || "",
      city: defaultAddress?.city || "",
      street: defaultAddress?.street || "",
      building: defaultAddress?.building || "",
      apartment: defaultAddress?.apartment || "",
      postalCode: defaultAddress?.postalCode || "",
    });
  }, [defaultAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handelCreateOrder( formData);
  };

  return (
    <main className="min-h-screen bg-background py-10 px-4 lg:px-0 flex flex-col lg:flex-row justify-between gap-5">
      <div className="flex flex-col gap-5 flex-1 ">
        <FormCheckout formData={formData} handleChange={handleChange} />
        <Payment />
      </div>
      <aside className=" ">
        <OrederSamary cart={cart} handleSubmit={handleSubmit} />
      </aside>
    </main>
  );
}

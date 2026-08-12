
import TrustCard from "./TrustCard";
import { CreditCard, Headphones, ShieldCheck, Truck } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto  px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">
            Shopping made simple
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Why Shop With Us?
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            We focus on making every step of your shopping experience simple,
            secure, and convenient.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <TrustCard
            icon={Truck}
            title="Fast Delivery"
            description="Get your orders delivered quickly and reliably."
          />

          <TrustCard
            icon={ShieldCheck}
            title="Secure Shopping"
            description="Your shopping experience is safe and protected."
          />

          <TrustCard
            icon={CreditCard}
            title="Easy Checkout"
            description="A simple checkout process without unnecessary steps."
          />

          <TrustCard
            icon={Headphones}
            title="Customer Support"
            description="We're here to help whenever you need us."
          />
        </div>
      </div>
    </section>
  );
}

import CategoryCard from "./CategoryCard";
import { ArrowRight, Laptop, Smartphone, Tablet, Watch } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Link } from "react-router";
import { useProduct } from "@/context/productContext";

export default function CtegorysSection() {
  const { setSearch } = useProduct();
  const categories = [
    {
      title: "Laptops",
      description: "Powerful performance for work & play",
      icon: Laptop,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      value: "6a74f7364ba4bfa769789db0",
    },
    {
      title: "Smartphones",
      description: "Latest smartphones for everyone",
      icon: Smartphone,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      value: "6a74f73f4ba4bfa769789db1",
    },
    {
      title: "Tablets",
      description: "Big screens. Endless possibilities",
      icon: Tablet,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      value: "6a7b5d16cac02e6a0c3e4501",
    },
    {
      title: "Smartwatches",
      description: "Stay connected, stay healthy",
      icon: Watch,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
      value: "6a7b5d22cac02e6a0c3e4502",
    },
  ];
  return (
    <section
      id="categories"
      className=" scroll-mt-20 mx-auto  px-4 py-16  lg:px-0"
    >
      <SectionHeading
        eyebrow="Browse collections"
        title="Shop by Category"
        description="Explore our collections and find what you're looking for."
        link="/products"
      />
      <div className="relative z-20 mt-14 overflow-hidden rounded-2xl border bg-card/20 backdrop-blur-md">
        <div className="grid grid-cols-1 divide-y sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                to="/products"
                className="group relative flex items-center gap-4 p-6 transition-colors hover:bg-muted/30"
                onClick={() => {
                  setSearch((pre) => ({ ...pre, category: category.value }));
                }}
              >
                {/* Icon */}

                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border ${category.border} ${category.bg}`}
                >
                  <Icon className={`h-6 w-6 ${category.color}`} />
                </div>

                {/* Content */}

                <div className="min-w-0">
                  <h3 className="text-base font-semibold">{category.title}</h3>

                  <p className="mt-1 max-w-[190px] text-sm leading-5 text-muted-foreground">
                    {category.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-foreground">
                    Shop Now
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/*
<SectionHeading
        eyebrow="Browse collections"
        title="Shop by Category"
        description="Explore our collections and find what you're looking for."
        link="/products"
      />

*/

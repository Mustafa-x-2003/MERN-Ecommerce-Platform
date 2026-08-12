import { Card, CardContent } from "@/components/ui/card";
import { useProduct } from "@/context/productContext";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

export default function CategoryCard({ title, description, icon: Icon, href, value }) {
  const { setSearch } = useProduct();
  return (
    <Link
      to={href}
      onClick={() => {
        setSearch((prev) => ({
          ...prev,
          category: value,
        }));
      }}
      className="group"
    >
      <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>

            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
          </div>

          <h3 className="mt-6 font-semibold">{title}</h3>

          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

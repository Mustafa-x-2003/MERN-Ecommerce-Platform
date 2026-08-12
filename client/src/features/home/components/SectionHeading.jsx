import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

export default function SectionHeading({ eyebrow, title, description, link }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-primary">{eyebrow}</p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      <Button asChild variant="ghost" className="hidden sm:flex">
        <Link to={link} className="flex items-center ">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

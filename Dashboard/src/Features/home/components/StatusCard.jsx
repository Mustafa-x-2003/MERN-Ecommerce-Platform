import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function StatusCard({ title, icon, data, desc, trend = "up" }) {
  const isUp = trend === "up";

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>

        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{data}</div>

        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span
            className={
              isUp
                ? "flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-500"
                : "flex items-center gap-1 font-medium text-destructive"
            }
          >
            <TrendingUp className={`size-3.5 ${!isUp && "rotate-180"}`} />

            {desc}
          </span>

          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

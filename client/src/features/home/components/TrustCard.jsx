import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function TrustCard({ icon: Icon, title, description }) {
  return (
    <Card className="bg-background">
      <CardContent className="p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>

        <h3 className="mt-5 font-semibold">{title}</h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

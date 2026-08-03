import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Pencil, Trash2 } from "lucide-react";

export default function AddressCard({ address }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin size={18} />
            {address.label || "Address"}
          </CardTitle>

          {address.isDefault && <Badge>Default</Badge>}
        </div>

        <CardDescription>
          {address.city}, {address.country}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm">{address.street}</p>

        <p className="text-sm text-muted-foreground">
          Building: {address.building}
        </p>

        <p className="flex items-center gap-2 text-sm">
          <Phone size={16} />
          {address.phone}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => {}}>
          <Pencil size={16} />
          Edit
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={() => {}}
        >
          <Trash2 size={16} />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

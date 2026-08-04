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
import { MapPin, Phone, Pencil, Trash2, Star } from "lucide-react";
import { IoStar } from "react-icons/io5";

export default function AddressCard({ address,setDefaultAddress, onEdit, onDelete }) {
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

      <CardFooter className="flex justify-between gap-2">
        <Button variant="outline" size="sm" onClick={() => {setDefaultAddress(address._id)}}>
          {address.isDefault ? (
            <IoStar className="text-yellow-500 " />
          ) : (
            <IoStar className="text-stone-600 " />
          )}
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(address)}>
            <Pencil size={16} />
            Edit
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(address._id)}
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

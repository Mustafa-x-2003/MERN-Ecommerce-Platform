import React, { memo, useCallback, useEffect, useState } from "react";
// Icons
import { Plus } from "lucide-react";
// /Icons
import { toast } from "react-toastify";
import AddressCard from "../components/addressesCard";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  DialogHeader,
  // DialogOverlay,
  // DialogPortal,
  DialogTitle,
  // DialogTrigger,
} from "../../../components/ui/dialog";
import EditAddressForm from "../components/EditAddressForm";
import { useAddresses } from "../../../context/addressesContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Addresses() {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const {
    addresses,
    handleAdd,
    handleUpdate,
    loading,
    fetchAddresses,
    setAddresses,
    handleDelete,
  } = useAddresses();

  const handleOpenEditDialog = useCallback((address) => {
    setSelectedAddress(address);

    setOpen(true);
  }, []);
  const handleDeleteAddress = useCallback(
    async (id) => {
      try {
        await handleDelete(id);
        await fetchAddresses();
        toast.success("Address Deleted successfully");
      } catch (error) {
        toast.error("Address Deleted Error");
      }
    },
    [handleDelete, fetchAddresses],
  );

  const onSave = useCallback(
    async (id, payload) => {
      if (!selectedAddress) {
        await handleAdd(payload);
        await fetchAddresses();
        toast.success("Address Added successfully");
        setOpen(false);
      } else {
        await handleUpdate(id, payload);
        await fetchAddresses();
        toast.success("Address updated successfully");
        setOpen(false);
      }
    },
    [selectedAddress, handleAdd, fetchAddresses, handleUpdate],
  );

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedAddress ? "Edit Address" : "Add Address"}
            </DialogTitle>
          </DialogHeader>

          <EditAddressForm
            id={selectedAddress?._id}
            address={selectedAddress}
            setAddress={setSelectedAddress}
            onSave={onSave}
          />
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Addresses</CardTitle>
            <Button
              icon={<Plus />}
              onClick={() => {
                setOpen(true);
                setSelectedAddress(null);
              }}
            >
              Add New Address
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid mb-4 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {addresses.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                onEdit={handleOpenEditDialog}
                onDelete={handleDeleteAddress}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default memo(Addresses);

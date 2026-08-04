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
import EditAddressForm from "../components/AddressForm";
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
    handlesetDefaultAddress,
  } = useAddresses();

  const handleOpenEditDialog = useCallback((address) => {
    setSelectedAddress(address);

    setOpen(true);
  }, []);
  const handleDeleteAddress = useCallback(
    async (id) => {
      await handleDelete(id);
    },
    [handleDelete],
  );

  const onSave = useCallback(
    async (id, payload) => {
      if (!selectedAddress) {
        await handleAdd(payload);
        setOpen(false);
      } else {
        await handleUpdate(id, payload);
        setOpen(false);
      }
    },
    [selectedAddress, handleAdd, handleUpdate],
  );

  const setDefaultAddress = useCallback(
    async (id) => {
      await handlesetDefaultAddress(id);
    },
    [handlesetDefaultAddress],
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
                setDefaultAddress={setDefaultAddress}
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

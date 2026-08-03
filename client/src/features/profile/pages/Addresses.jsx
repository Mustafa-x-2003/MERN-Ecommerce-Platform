import React, { useState } from "react";

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

export default function Addresses() {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const {
    addresses,
    handleUpdate,
    loading,
    fetchAddresses,
    setAddresses,
    handleDelete,
  } = useAddresses();

  const handleOpenEditDialog = (address) => {
    setSelectedAddress(address);

    setOpen(true);
  };

  async function handleDeleteAddress(id) {
    try {
      await handleDelete(id);
      await fetchAddresses();
      toast.success("Address deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }
  async function handleEditAddres(addressID, payload) {
    await handleUpdate(addressID, payload);
    await fetchAddresses();
    toast.success("Address updated successfully");
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
          </DialogHeader>

          {selectedAddress && (
            <EditAddressForm
              address={selectedAddress}
              setAddress={setSelectedAddress}
              onSave={handleEditAddres}
            />
          )}
        </DialogContent>
      </Dialog>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {addresses.map((address) => (
          <AddressCard
            key={address._id}
            address={address}
            onEdit={handleOpenEditDialog}
            onDelete={handleDeleteAddress}
          />
        ))}
      </div>
    </div>
  );
}

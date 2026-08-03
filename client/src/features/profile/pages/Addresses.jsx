import React from "react";


import { toast } from "react-toastify";
import AddressCard from "../components/addressesCard";

import { useAddresses } from "../../../context/addressesContext";

export default function Addresses() {

  const { addresses, fetchAddresses, handleDelete, } = useAddresses();
    
  async function handleDeleteAddress(id) {
    try {
      await handleDelete(id);
      await fetchAddresses();
      toast.success("Address deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
     
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {addresses.map((address) => (
          <AddressCard
            key={address._id}
            address={address}
            
            onDelete={handleDeleteAddress}
            
          />
        ))}
      </div>
    </div>
  );
}

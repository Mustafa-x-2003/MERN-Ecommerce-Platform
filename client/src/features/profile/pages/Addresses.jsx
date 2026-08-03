import React from "react";

import AddressCard from "../components/addressesCard";

import { useAddresses } from "../../../context/addressesContext";

export default function Addresses() {
  const { addresses, loading } = useAddresses();

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {addresses.map((address) => (
          <AddressCard key={address._id} address={address} />
        ))}
      </div>
    </div>
  );
}

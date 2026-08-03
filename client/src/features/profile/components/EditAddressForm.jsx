import React, { useState } from "react";
import ProfileForm from "./ProfileForm";

export default function EditAddressForm({ address, onClose ,onSave}) {
  const [form, setForm] = useState({
    name: address.name,
    phone: address.phone,
    country: address.country,
    city: address.city,
    street: address.street,
    building: address.building,
    apartment: address.apartment,
    postalCode: address.postalCode,
  });
  const profileFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
    },
    {
      name: "country",
      label: "Country",
      type: "text",
    },
    {
      name: "city",
      label: "City",
      type: "text",
    },
    {
      name: "street",
      label: "Street",
      type: "text",
    },
    {
      name: "building",
      label: "Building",
      type: "text",
    },
    {
      name: "apartment",
      label: "Apartment",
      type: "text",
    },
    {
      name: "postalCode",
      label: "PostalCode",
      type: "text",
    },
  ];
  return (
    <div>
      <ProfileForm
        fields={profileFields}
        formData={form}
        setFormData={setForm}
        onSubmit={onSave}
      />
    </div>
  );
}

import React, { memo, useEffect, useMemo, useState } from "react";
import ProfileForm from "./ProfileForm";
import { getFormData } from "../utils/address.utils";

function EditAddressForm({ address, id, onSave }) {
  const [form, setForm] = useState(getFormData(address));

  useEffect(() => {
    setForm(getFormData(address));
  }, [address]);

  const profileFields = useMemo(
    () => [
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
    ],
    [],
  );
  return (
    <div>
      <ProfileForm
        id={id}
        fields={profileFields}
        formData={form}
        setFormData={setForm}
        onSubmit={onSave}
      />
    </div>
  );
}
export default memo(EditAddressForm);

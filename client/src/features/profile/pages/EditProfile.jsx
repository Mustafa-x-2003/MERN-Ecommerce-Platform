import React, { useCallback, useEffect, useMemo, useState } from "react";
import ProfileForm from "../components/ProfileForm";
// import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

export default function EditProfile() {
  const { editProfile, user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  }, [user]);
  const handleUpdatUser = useCallback(() => {
    editProfile(form);
  }, [editProfile, form]);
  const profileFields = useMemo(
    () => [
      {
        name: "name",
        label: "Name",
        type: "text",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
      },
      {
        name: "phone",
        label: "Phone",
        type: "text",
      },
    ],
    [],
  );

  return (
    <div>
      <ProfileForm
        fields={profileFields}
        formData={form}
        setFormData={setForm}
        onSubmit={handleUpdatUser}
      />
    </div>
  );
}

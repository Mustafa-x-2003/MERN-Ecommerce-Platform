import React, { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const { handleChangePassword } = useAuth();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const passwordFields = [
    {
      name: "oldPassword",
      label: "Old Password",
      type: "password",
    },
    {
      name: "newPassword",
      label: "New Password",
      type: "password",
    },
  ];

  async function ChangePassword() {
    try {
      await handleChangePassword(form);
      setForm({
        oldPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  }
  return (
    <div>
      <ProfileForm
        fields={passwordFields}
        formData={form}
        setFormData={setForm}
        onSubmit={ChangePassword}
      />
    </div>
  );
}

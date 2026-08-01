import React, { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import { useAuth } from "@/context/AuthContext";

export default function EditProfile() {
  const { changePassword } = useAuth();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const passwordFields = [
    {
      name: "oldPassword",
      label: "Old Password",
      type: "text",
    },
    {
      name: "newPassword",
      label: "New Password",
      type: "text",
    },
  ];
  async function changepassword() {
    try {
      await changePassword(form);
      setForm({
        oldPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h2 className="pb-4">Edit Profile</h2>
      <ProfileForm
        fields={passwordFields}
        formData={form}
        setFormData={setForm}
        onSubmit={changepassword}
      />
    </div>
  );
}

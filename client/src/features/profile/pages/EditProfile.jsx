import React, { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/features/auth/auth.service";
import { toast } from "react-toastify";

export default function EditProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  const profileFields = [
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
  ];
  async function editProfile() {
    try {
      await updateProfile(form);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  }
  return (
    <div>
      <h2 className="pb-4">Edit Profile</h2>
      <ProfileForm
        fields={profileFields}
        formData={form}
        setFormData={setForm}
        onSubmit={editProfile}
      />
    </div>
  );
}

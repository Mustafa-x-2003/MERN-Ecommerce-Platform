import React, { useEffect, useMemo, useState } from "react";
import ProfileForm from "../components/ProfileForm";
// import { useAuth } from "@/context/AuthContext";
import { getProfile, updateProfile } from "@/features/auth/auth.service";
import { toast } from "react-toastify";

export default function EditProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    const getdata = async () => {
      const res = await getProfile();

      setForm({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
      });
    };
    getdata();
  }, []);

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
      <ProfileForm
        fields={profileFields}
        formData={form}
        setFormData={setForm}
        onSubmit={editProfile}
      />
    </div>
  );
}

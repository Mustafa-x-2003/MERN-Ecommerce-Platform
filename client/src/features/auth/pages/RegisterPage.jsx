import React, { useState } from "react";
import { RegisterForm } from "../components/RegisterForm";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  async function onSubmit() {
    try {
      await register(form);
    } catch (error) {
      error.response?.data?.message || "Registration failed";
    }
  }
  return (
    <div className=" h-screen flex justify-center items-center items-center ">
      <RegisterForm
        className={"w-full px-4 md:w-150"}
        form={form}
        setForm={setForm}
        onSubmit={onSubmit}
      />
    </div>
  );
}

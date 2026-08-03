import React, { useState } from "react";
import { RegisterForm } from "../components/RegisterForm";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { handleRegister } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  async function onSubmit() {
    try {
      await handleRegister(form);
    } catch (error) {
      error.response?.data?.message || "Registration failed";
    }
  }
  return (
    <div className=" h-[calc(100vh-72px)] flex justify-center items-center ">
      <RegisterForm
        className={"w-full  md:w-130"}
        form={form}
        setForm={setForm}
        onSubmit={onSubmit}
      />
    </div>
  );
}

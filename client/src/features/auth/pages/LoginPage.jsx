import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import { toast } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  async function onSupmit(e) {
    e.preventDefault();
    try {
      await login(form);
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className=" h-screen flex justify-center items-center items-center ">
      <LoginForm
        className={"w-full px-4 md:w-150"}
        onSubmit={onSupmit}
        form={form}
        setForm={setForm}
      />
    </div>
  );
}

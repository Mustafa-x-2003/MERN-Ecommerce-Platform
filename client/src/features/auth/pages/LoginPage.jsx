import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const { handleLogin } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  async function onSupmit(e) {
    e.preventDefault();
    try {
      await handleLogin(form);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className=" h-[calc(100vh-72px)] flex justify-center items-center ">
      <LoginForm
        className={"w-full  md:w-130"}
        onSubmit={onSupmit}
        form={form}
        setForm={setForm}
      />
    </div>
  );
}

import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, MapPin, Settings } from "lucide-react";

import { NavLink, Outlet } from "react-router";

export default function ProfilePage() {
  const links = [
    {
      title: "Edit Profile",
      path: "/profile/edit",
      icon: <User />,
    },
    {
      title: "Change Password",
      path: "/profile/password",
      icon: <Lock />,
    },
    {
      title: "Addresses",
      path: "/profile/addresses",
      icon: <MapPin />,
    },
    {
      title: "Settings",
      path: "/profile/settings",
      icon: <Settings />,
    },
  ];

  return (
    <div className="container flex gap-4 justify-between mx-auto flex justify-center min-h-[calc(100vh-72px)] py-10">
      <Card className="w-full h-fit md:w-auto flex-shrink max-w-md">
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/avatar.png" />
            <AvatarFallback>MO</AvatarFallback>
          </Avatar>

          <CardTitle className="mt-4 text-xl">Mostafa Ahmed</CardTitle>

          <CardDescription>mostafa@gmail.com</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`
              }
            >
              {link.icon}
              <span>{link.title}</span>
            </NavLink>
          ))}
        </CardContent>
      </Card>
      <div className=" min-100 flex-1">
        <Outlet />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "@/context/AuthContext";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProfile } from "@/features/auth/auth.service";
import { User, Pencil, Lock, MapPin, Settings } from "lucide-react";

import { NavLink, Outlet } from "react-router";

export default function ProfilePage() {
  const [user, setUser] = useState();
  useEffect(() => {
    const getdata = async () => {
      const res = await getProfile();
      setUser(res.data);
    };
    getdata();
  }, []);
  const links = [
    {
      title: "Profile Overview",
      path: "/profile/overview",
      icon: <User />,
    },
    {
      title: "Edit Profile",
      path: "/profile/edit",
      icon: <Pencil />,
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
    <div className=" flex gap-4 justify-between py-10">
      <Card className="w-full">
        {/* Profile Header */}
        <CardHeader className="flex flex-row items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.avatar} />

              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>

            <div>
              <CardTitle className="text-2xl">{user?.name}</CardTitle>

              <Badge className="mt-2">{user?.role}</Badge>
            </div>
          </div>

          <Button asChild>
            <Link to="/profile/edit">Edit Profile</Link>
          </Button>
        </CardHeader>

        <Separator />

        {/* User Information */}
        <CardContent className="p-6 flex flex-col sm:flex-row justify-between gap-5">
          <div className=" flex items-center justify-between sm:block">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 mb-2 rounded-lg px-2 md:px-4 py-3 transition-colors
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`
                }
              >
                {link.icon}
                <span className=" hidden sm:block">{link.title}</span>
              </NavLink>
            ))}
          </div>
          <div className="  flex-1">
            <Outlet />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

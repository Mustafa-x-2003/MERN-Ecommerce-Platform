import React from "react";
import { Link } from "react-router";
import { useAuth } from "@/context/AuthContext";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProfileOverview() {
  const { user } = useAuth();

  return (
    <Card className="w-full">
      {/* Profile Header */}
      <CardHeader className="flex flex-row items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.avatar} />

            <AvatarFallback>
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="text-2xl">
              {user?.name}
            </CardTitle>

            <Badge className="mt-2">
              {user?.role}
            </Badge>
          </div>
        </div>

        <Button asChild>
          <Link to="/profile/edit">
            Edit Profile
          </Link>
        </Button>
      </CardHeader>


      <Separator />


      {/* User Information */}
      <CardContent className="p-6">

        <h3 className="mb-5 text-lg font-semibold">
          Personal Information
        </h3>


        <div className="grid gap-4 md:grid-cols-2">

          <InfoCard
            title="Full Name"
            value={user?.name}
          />

          <InfoCard
            title="Email Address"
            value={user?.email}
          />

          <InfoCard
            title="Phone Number"
            value={user?.phone || "Not provided"}
          />

          <InfoCard
            title="Account Type"
            value={user?.role}
          />

        </div>

      </CardContent>

    </Card>
  );
}


function InfoCard({ title, value }) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <p className="mt-1 font-medium">
        {value}
      </p>
    </div>
  );
}
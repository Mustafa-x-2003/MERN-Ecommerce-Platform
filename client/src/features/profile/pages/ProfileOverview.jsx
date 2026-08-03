import React, { useEffect, useState } from "react";

import { getProfile } from "@/features/auth/auth.service";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileOverview() {
  // const { user } = useAuth();
  const [user, setUser] = useState();
  useEffect(() => {
    const getdata = async () => {
      const res = await getProfile();
      setUser(res.data);
    };
    getdata();
  }, []);
  return (
    <Card>
      <CardContent>
        <div>
          <h3 className="mb-5 text-lg font-semibold">Personal Information</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Full Name" value={user?.name} />

            <InfoCard title="Email Address" value={user?.email} />

            <InfoCard
              title="Phone Number"
              value={user?.phone || "Not provided"}
            />

            <InfoCard title="Account Type" value={user?.role} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">{title}</p>

      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

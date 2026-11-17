import {
  DollarSign,
  Package,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "lucide-react";
import StatusCard from "../components/StatusCard";
import { useEffect } from "react";
import { getOverviewStats } from "../services/services";

export default function Overview() {
  const feachData = async () => {
    const res = await getOverviewStats("7d");
    console.log(res.data);
    
  };
  useEffect(() => {
    feachData();
  }, []);
  return (
    <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
      <StatusCard
        title="Total Revenue"
        data="$45,231.89"
        desc="+20.1%"
        trend="up"
        icon={<DollarSign className="size-5" />}
      />

      <StatusCard
        title="Orders"
        data="2,350"
        desc="+12.5%"
        trend="up"
        icon={<ShoppingCart className="size-5" />}
      />

      <StatusCard
        title="Customers"
        data="1,429"
        desc="-4.3%"
        trend="down"
        icon={<Users className="size-5" />}
      />

      <StatusCard
        title="Products"
        data="573"
        desc="+8.2%"
        trend="up"
        icon={<Package className="size-5" />}
      />
    </div>
  );
}

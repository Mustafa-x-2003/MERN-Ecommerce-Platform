import {
  User,
  House,
  Package,
  ShoppingCart,
  ClipboardList,
} from "lucide-react";
import SidebarItem from "../ui/SidebarItem";

export default function SidebarLinks() {
  const links = [
    {
      title: "Dashboard",
      path: "dashboard",
      icon: <House size={18} />,
    },
    {
      title: "Users",
      path: "users",
      icon: <User size={18} />,
    },
    {
      title: "Products",
      path: "products",
      icon: <Package size={18} />,
    },
    {
      title: "Orders",
      path: "orders",
      icon: <ClipboardList size={18} />,
    },
    {
      title: "Carts",
      path: "carts",
      icon: <ShoppingCart size={18} />,
    },
  ];
  return (
    <ul className="flex flex-col gap-1">
      {links.map((link) => (
        <li key={link.path}>
          <SidebarItem title={link.title} path={link.path} icon={link.icon} />
        </li>
      ))}
    </ul>
  );
}

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import HeaderLink from "./HeaderLink";
// Start Import Icons
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { UserRound } from "lucide-react";
import { TextAlignJustify } from "lucide-react";
import { House } from "lucide-react";
import { Handbag } from "lucide-react";
import { ClipboardList } from "lucide-react";
// End Import Icons
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "../ui/drawer";
import { Link, NavLink, useNavigate } from "react-router";
export default function NavBare() {
  const navigate = useNavigate()
  const { logout, user } = useAuth();
  const links = [
    { path: "home", title: "Home", icon: <House /> },
    { path: "products", title: "Shop", icon: <Handbag /> },
    { path: "orders", title: "My Orders", icon: <ClipboardList /> },
  ];
  const icons = [
    { path: "/wishlist", title: "Wishlist", icon: <Heart /> },
    { path: "/cart", title: "Cart", icon: <ShoppingCart /> },
    { path: "/profile", title: "Profile", icon: <UserRound /> },
  ];
  return (
    <header className="w-full fixed top-0 z-1000 border-b border-border bg-background py-4">
      <div className="container mx-auto flex h-10 items-center justify-between px-4">
        <span className="md:hidden">
          <Drawer swipeDirection="left">
            <DrawerTrigger>
              <span className=" block p-3 bg-secondary border border-border rounded-lg">
                <TextAlignJustify />
              </span>
            </DrawerTrigger>

            <DrawerContent className="flex flex-col">
              <DrawerHeader>
                <DrawerTitle>NovaCart</DrawerTitle>
                <DrawerDescription>
                  Everything you need, all in one place.
                </DrawerDescription>
              </DrawerHeader>

              <ul className="  flex flex-col pt-5 py-3   gap-2">
                {links.map((link) => {
                  return (
                    <HeaderLink
                      key={link.path}
                      path={link.path}
                      title={link.title}
                      icon={link.icon}
                    />
                  );
                })}
              </ul>
              <div className="flex flex-1 border-t border-border pt-3 flex-col justify-between">
                <ul className="flex flex-col gap-2 ">
                  {icons.map((item) => {
                    return (
                      <HeaderLink
                        key={item.title}
                        path={item.path}
                        title={item.title}
                        icon={item.icon}
                      />
                    );
                  })}
                </ul>

                <Button
                  variant="destructive"
                  onClick={logout}
                  className=" mb-4 w-full"
                >
                  Logout
                </Button>
              </div>

              <DrawerFooter>
                <DrawerClose>Close</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </span>

        <Link
          to="/"
          className="text-2xl flex items-center gap-2 font-extrabold tracking-tight text-primary"
        >
          <Handbag size={27} /> NovaCart
        </Link>

        <ul className=" hidden md:flex items-center gap-2">
          {links.map((link) => {
            return (
              <HeaderLink
                key={link.title}
                path={link.path}
                title={link.title}
              />
            );
          })}
        </ul>

        <div className="hidden md:flex  items-center gap-8">
          <div className="flex items-center gap-4">
            {icons.map((item) => {
              return (
                <Link
                  to={item.path}
                  key={item.title}
                  className="cursor-pointer text-foreground transition-colors hover:text-primary"
                >
                  {item.icon}
                </Link>
              );
            })}
          </div>
          {user ? (
            <Button
              variant="destructive"
              onClick={logout}
              className={"px-4 py-2"}
            > Logout </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={()=>{navigate("/login")}}
              className={"px-4 py-2"}
            >Login</Button>
          )}
        </div>
      </div>
    </header>
  );
}

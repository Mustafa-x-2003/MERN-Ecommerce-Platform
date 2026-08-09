import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import HeaderLink from "./HeaderLink";
// Start Import Icons
import {
  Heart,
  Search,
  ShoppingCart,
  UserRound,
  TextAlignJustify,
  House,
  Handbag,
  ClipboardList,
  LogOut,
} from "lucide-react";

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
import { Link } from "react-router";
import { useProduct } from "@/context/productContext";
import { Input } from "../ui/input";
import { useCart } from "@/context/cartContext";
import { useWishlist } from "@/context/wishlistContext";
export default function NavBare() {
  const { handleLogout, user } = useAuth();
  const links = [
    { path: "home", title: "Home", icon: <House /> },
    { path: "products", title: "Shop", icon: <Handbag /> },
    { path: "orders", title: "My Orders", icon: <ClipboardList /> },
  ];
  const { search, setSearch } = useProduct();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const icons = [
    {
      path: "/wishlist",
      title: "Wishlist",
      icon: <Heart />,
      length: wishlist?.length,
    },
    {
      path: "/cart",
      title: "Cart",
      icon: <ShoppingCart />,
      length: cart?.length,
    },
    {
      path: "/profile/overview",
      title: "Profile",
      icon: <UserRound />,
    },
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
                    <DrawerClose key={link.title}>
                      <HeaderLink
                        key={link.path}
                        path={link.path}
                        title={link.title}
                        icon={link.icon}
                      />
                    </DrawerClose>
                  );
                })}
              </ul>
              <div className="flex border-t border-border pt-3 flex-col ">
                <ul className="flex flex-col gap-2 ">
                  {icons.map((item) => {
                    return (
                      <DrawerClose key={item.title}>
                        <HeaderLink
                          path={item.path}
                          title={item.title}
                          icon={item.icon}
                        />
                      </DrawerClose>
                    );
                  })}
                </ul>

                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className=" justify-start px-5 bg-transparent! hover:bg-[var(--destructive)]! text-[var(--foreground)] "
                  icon={<LogOut className="size-5" />}
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
          <div className="hidden lg:flex relative items-center">
            <Input
              value={search.name}
              className={"h-10 px-3"}
              onChange={(e) => {
                setSearch({ ...search, name: e.target.value });
              }}
              id="name"
              type="text"
              placeholder="Search..."
              required
            />
            <span className=" absolute right-3">
              <Search size={18} />
            </span>
          </div>
          <div className="flex items-center gap-4">
            {icons.map((item) => {
              return (
                <Link
                  to={item.path}
                  key={item.title}
                  className=" relative cursor-pointer text-foreground transition-colors hover:text-primary"
                >
                  {item.icon}
                  {item.length > 0 && (
                    <span className=" absolute w-4 h-4 rounded-full flex justify-center items-center text-[12px] -top-2 -right-2 bg-amber-600">
                      {item.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
          {user ? (
            <Button
              variant="destructive"
              onClick={handleLogout}
              className={"px-4 py-2"}
              icon={<LogOut />}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="destructive" className={"px-4 py-2"}>
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

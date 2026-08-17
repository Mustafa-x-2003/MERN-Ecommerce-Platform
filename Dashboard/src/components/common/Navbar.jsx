import { Bell, ChevronDown, LogOut, Menu, User } from "lucide-react";

import { Button } from "../ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import ThemeToggle from "./ThemeToggle";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import SidebarLinks from "./SidebarLinks";


export default function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      {/* Page information */}
      <div>
        <span className="lg:hidden">
          <Drawer swipeDirection="left">
            <DrawerTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </DrawerTrigger>

            <DrawerContent className={"w-64"}>
              <DrawerHeader>
                <DrawerTitle className={" h-15 flex items-center"}>
                  Dashboard
                </DrawerTitle>
              </DrawerHeader>

              <nav>
                <SidebarLinks />
              </nav>
            </DrawerContent>
          </Drawer>
        </span>

        <h1 className="text-lg hidden lg:block font-semibold tracking-tight">
          Dashboard
        </h1>

        <p className="text-sm hidden lg:block text-muted-foreground">
          Overview of your store
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="size-5" />

          <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive" />
        </Button>

        {/* Theme */}
        <ThemeToggle />

        {/* Admin profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="ml-2 h-auto gap-2 rounded-lg px-2 py-1.5"
            >
              <Avatar className="size-8">
                <AvatarImage src="" alt="Mustafa" />

                <AvatarFallback>M</AvatarFallback>
              </Avatar>

              <div className="hidden text-left md:block">
                <p className="text-sm font-medium">Mustafa</p>

                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>

              <ChevronDown className="hidden size-4 text-muted-foreground md:block" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" sideOffset={8} className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col gap-1">
                <span>My Account</span>

                <span className="text-xs font-normal text-muted-foreground">
                  Manage your account
                </span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive">
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

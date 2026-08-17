import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className=" hidden lg:block w-64 shrink-0 border-r  border-sidebar-border bg-sidebar text-sidebar-foreground">
        <Sidebar />
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Navbar */}
        <header className="sticky h-16  top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
          <Navbar />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto ">{/* <Outlet /> */}</main>
      </div>
    </div>
  );
}

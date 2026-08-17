import SidebarLinks from "./SidebarLinks";


export default function Sidebar() {
  

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-sidebar-border px-5">
        <span className="text-lg font-semibold tracking-tight">Dashboard</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4">
        <SidebarLinks/>
      </nav>
    </div>
  );
}

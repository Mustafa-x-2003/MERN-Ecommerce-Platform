import { NavLink } from "react-router";

export default function SidebarItem({ title, path, icon }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        ` group flex items-center gap-3 px-4 py-2.5 my-1 rounded-lg text-sm font-medium transition-colors duration-200
        ${
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }
        `
      }
    >
      <span className="shrink-0 transition-colors">{icon}</span>

      <span>{title}</span>
    </NavLink>
  );
}

import React from "react";
import { NavLink } from "react-router";

export default function HeaderLink({ path, title, icon }) {
  return (
    <li className="rounded-lg text-[16px]   transition-colors hover:bg-accent hover:text-accent-foreground">
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-lg ${
            isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`
        }
      >
        {icon ? <span className="currentColor">{icon}</span> : ""}

        {title}
      </NavLink>
    </li>
  );
}

import React from "react";
import { NavLink } from "react-router";

export default function HeaderLink({ path, title, icon, length }) {
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
        {icon ? (
          <span className="currentColor relative">
            {length > 0 && (
              <span className=" absolute w-4 h-4 pt-0.5 rounded-full flex justify-center items-center text-[12px] -top-2 -right-2 bg-primary text-primary-foreground">
                {length}
              </span>
            )}
            {icon}
          </span>
        ) : (
          ""
        )}

        {title}
      </NavLink>
    </li>
  );
}

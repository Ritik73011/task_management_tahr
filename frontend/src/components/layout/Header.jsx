"use client";

import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

import ROUTES from "@/config/routes";
import { useAuth } from "@/context/AuthProvider";

const Header = () => {
  const pathname = usePathname();

  const { user, logout } = useAuth();

  const pageTitles = {
    [ROUTES.DASHBOARD]: "Dashboard",
    [ROUTES.PROJECTS]: "Projects",
    [ROUTES.TASKS]: "Tasks",
  };

  const title = pageTitles[pathname] || "Task Management";

  const initials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-white)] px-8 shadow-sm">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-dark)]">{title}</h1>

        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Welcome back{user?.name ? `, ${user.name}` : ""}.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="text-sm font-semibold text-[var(--color-dark)]">
            {user?.name}
          </p>

          <p className="text-xs text-[var(--color-muted)]">{user?.email}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-semibold text-[var(--color-white)]">
          {initials || "U"}
        </div>

        <button
          type="button"
          onClick={logout}
          className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 hover:bg-[var(--color-surface)]"
          title="Logout"
        >
          <LogOut size={20} className="text-[var(--color-dark)]" />
        </button>
      </div>
    </header>
  );
};

export default Header;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, FolderKanban, ListTodo, LogOut } from "lucide-react";

import ROUTES from "@/config/routes";
import { useAuth } from "@/context/AuthProvider";

const Sidebar = () => {
  const pathname = usePathname();

  const { logout } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      href: ROUTES.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      title: "Projects",
      href: ROUTES.PROJECTS,
      icon: FolderKanban,
    },
    {
      title: "Tasks",
      href: ROUTES.TASKS,
      icon: ListTodo,
    },
  ];

  return (
    <aside className="flex h-screen w-72 flex-col bg-[var(--color-primary)] text-[var(--color-white)] shadow-xl">
      {/* Logo */}
      <div className="border-b border-white/10 px-6 py-7">
        <h1 className="text-2xl font-bold tracking-wide">Task Manager</h1>

        <p className="mt-1 text-sm text-white/70">
          Manage your work efficiently
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
                ${
                  active
                    ? "bg-[var(--color-white)] text-[var(--color-primary)] shadow-md"
                    : "text-white/80 hover:bg-white/10 hover:text-[var(--color-white)]"
                }`}
            >
              <Icon
                size={20}
                className={
                  active ? "text-[var(--color-primary)]" : "text-inherit"
                }
              />

              <span
                className={
                  active ? "text-[var(--color-primary)]" : "text-inherit"
                }
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-[var(--color-white)]"
        >
          <LogOut size={20} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Spinner from "@/components/common/Spinner";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

import ROUTES from "@/config/routes";
import { useAuth } from "@/context/AuthProvider";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <Spinner fullScreen />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto bg-[var(--color-background)] p-6 md:p-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

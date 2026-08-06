"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Spinner from "@/components/common/Spinner";
import ROUTES from "@/config/routes";
import { useAuth } from "@/context/AuthProvider";

export default function AuthLayout({ children }) {
  const router = useRouter();

  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <Spinner fullScreen />;
  }

  if (isAuthenticated) {
    return null;
  }

  return children;
}

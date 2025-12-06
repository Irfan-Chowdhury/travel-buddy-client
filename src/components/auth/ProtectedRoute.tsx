"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  role?: "admin" | "user"; // optional role protection
}

export default function ProtectedRoute({ children, role }: Props) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");

    if (!token || !userJson) {
      router.replace("/login");
      return;
    }

    const user = JSON.parse(userJson);

    // If role protection is needed
    if (role && user.role !== role) {
      // Admin trying to access user page? or user trying admin?
      if (user.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/user/dashboard");
      }
      return;
    }

    setAllowed(true);
  }, [router, role]);

  if (!allowed) return null; // hide content while checking

  return <>{children}</>;
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


import LoginPage from "../../../../components/auth/LoginPage";


export default function Page() {

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");

    if (token && userJson) {
      const user = JSON.parse(userJson);
      router.replace(
        user.role === "admin"
          ? "/admin/dashboard"
          : "/user/dashboard"
      );
    }
  }, [router]);

  return <LoginPage />;
}
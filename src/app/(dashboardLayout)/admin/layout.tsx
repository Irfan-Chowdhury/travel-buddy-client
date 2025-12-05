import type { ReactNode } from "react";
import { Navbar } from "@/components/admin/Navbar";
import AdminClientWrapper from "./AdminClientWrapper";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Admin Dashboard | Travel Buddy",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <AdminClientWrapper>{children}</AdminClientWrapper>
    </div>
  );
}

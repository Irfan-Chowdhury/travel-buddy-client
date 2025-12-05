"use client";
import { useState, ReactNode } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Navbar } from "@/components/admin/Navbar";

export default function AdminClientWrapper({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Navbar />
      <main className="md:ml-64 pt-16">{children}</main>
    </>
  );
}

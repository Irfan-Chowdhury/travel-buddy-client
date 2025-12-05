"use client";

import { Home, Users, Map, BarChart3, Settings, LogOut, Compass } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname(); // current route
  const router = useRouter();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { id: "users", label: "User Management", icon: Users, href: "/admin/user-management" },
    { id: "travel-plans", label: "Travel Plans", icon: Map, href: "/admin/travel-plans" },
    { id: "reports", label: "Reports", icon: BarChart3, href: "/admin/reports" },
    { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="bg-teal-500 p-2 rounded-lg">
          <Compass className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900">Travel Buddy</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href; // highlight current route

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-teal-600" : "text-gray-400"}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => {
            // TODO: handle logout logic here
            router.push("/login");
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

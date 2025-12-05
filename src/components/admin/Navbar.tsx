"use client";

import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/Input";

export function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-0 md:left-64 z-10 px-6 flex items-center justify-between">
      {/* Search Bar */}
      <div className="w-96">
        <Input
          placeholder="Search users, plans, or reports..."
          icon={<Search className="w-4 h-4" />}
          className="bg-gray-50 border-gray-200 focus:bg-white"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 mx-1"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>

          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            <User className="w-5 h-5 text-teal-600" />
          </div>
        </div>
      </div>
    </header>
  );
}

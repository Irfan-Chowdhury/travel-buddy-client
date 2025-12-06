"use client";

import { Menu, X, Compass } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/lib/logout";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      const parsedUser = JSON.parse(user);
      setUserRole(parsedUser.role); // "admin" or "user"
    } else {
      setUserRole(null); // not logged in
    }
  }, []);

  const logoutHandler = () => {
    handleLogout();
    setUserRole(null);
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 rounded-full flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Travel Buddy
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>

            <Link href="/explore" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Explore Travelers
            </Link>

            {/* WHEN LOGGED OUT */}
            {!userRole && (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Login
                </Link>
                <Link href="/register" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Register
                </Link>
              </>
            )}

            {/* WHEN LOGGED IN */}
            {userRole && (
              <>
                {userRole === "admin" && (
                  <Link href="/admin/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    Admin Dashboard
                  </Link>
                )}

                {userRole === "user" && (
                  <Link href="/user/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={logoutHandler}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>

            <Link href="/explore" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Explore Travelers
            </Link>

            {/* When NOT logged in */}
            {!userRole && (
              <>
                <Link href="/login" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                  Login
                </Link>
                <Link href="/register" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                  Register
                </Link>
              </>
            )}

            {/* When logged in */}
            {userRole && (
              <>
                {userRole === "admin" && (
                  <Link href="/admin/dashboard" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                    Admin Dashboard
                  </Link>
                )}

                {userRole === "user" && (
                  <Link href="/user/dashboard" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={logoutHandler}
                  className="block py-2 w-full text-left text-red-600 font-medium hover:bg-red-50 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

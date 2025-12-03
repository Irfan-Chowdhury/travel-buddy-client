"use client";

// import React, { useState } from 'react';
import { Menu, X, Compass } from 'lucide-react';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 rounded-full flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Travel Buddy
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/explore" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Explore
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Dashboard
            </Link>
            <Link href="/login" variant="outline" size="sm">
              Login
            </Link>
            <Link href="/registration">Registration</Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/explore" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Explore
            </Link>
            <Link href="/dashboard" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Dashboard
            </Link>
            <div className="pt-3 space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Login
              </Button>
              <Button size="sm" className="w-full">
                Sign Up
              </Button>
            </div>
          </div>
        </div>}
    </nav>;
}
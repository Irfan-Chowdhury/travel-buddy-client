"use client";

import Link from "next/link";
import { RegistrationForm } from "./RegistrationForm";

// import { RegistrationForm } from "./RegistrationForm";

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
            <span className="text-2xl font-bold text-white">R</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-10 border border-gray-100">
          <RegistrationForm />
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">© 2024 Registration Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
    </div>
  );
}

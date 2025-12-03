// import React from 'react';
// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
//   size?: 'sm' | 'md' | 'lg';
//   children: React.ReactNode;
// }
// export function Button({
//   variant = 'primary',
//   size = 'md',
//   children,
//   className = '',
//   ...props
// }: ButtonProps) {
//   const baseStyles = 'font-medium rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
//   const variants = {
//     primary: 'bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 text-white hover:shadow-lg hover:scale-105',
//     secondary: 'bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md',
//     outline: 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
//     ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
//   };
//   const sizes = {
//     sm: 'px-4 py-2 text-sm',
//     md: 'px-6 py-3 text-base',
//     lg: 'px-8 py-4 text-lg'
//   };
//   return <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
//       {children}
//     </button>;
// }


"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  isLoading?: boolean;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  fullWidth = false,
  isLoading = false,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest} // fullWidth is NOT included here — FIXED
      className={clsx(
        "rounded-md font-medium transition-colors flex items-center justify-center",
        fullWidth && "w-full",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "outline" && "border border-gray-300 hover:bg-gray-100",
        size === "sm" && "px-3 py-2 text-sm",
        size === "md" && "px-4 py-2 text-base",
        size === "lg" && "px-5 py-3 text-lg",
        isLoading && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

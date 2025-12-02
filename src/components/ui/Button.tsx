import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 text-white hover:shadow-lg hover:scale-105',
    secondary: 'bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md',
    outline: 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  return <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>;
}
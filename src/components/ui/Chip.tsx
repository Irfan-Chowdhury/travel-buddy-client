import React from 'react';
interface ChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient';
  active?: boolean;
  onClick?: () => void;
}
export function Chip({
  children,
  variant = 'default',
  active = false,
  onClick
}: ChipProps) {
  const baseStyles = 'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200';
  const variants = {
    default: active ? 'bg-blue-100 text-blue-700 border-2 border-blue-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    gradient: 'bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 text-white'
  };
  return <span className={`${baseStyles} ${variants[variant]} ${onClick ? 'cursor-pointer hover:scale-105' : ''}`} onClick={onClick}>
      {children}
    </span>;
}
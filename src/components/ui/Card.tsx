import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}
export function Card({
  children,
  className = '',
  hover = false
}: CardProps) {
  return <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${hover ? 'transition-transform duration-200 hover:scale-105 hover:shadow-xl cursor-pointer' : ''} ${className}`}>
      {children}
    </div>;
}
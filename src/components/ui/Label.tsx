import React from 'react';
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}
export function Label({
  children,
  className = '',
  required,
  ...props
}: LabelProps) {
  return <label className={`block text-sm font-medium text-gray-700 mb-1.5 ${className}`} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1" aria-hidden="true">
          *
        </span>}
    </label>;
}
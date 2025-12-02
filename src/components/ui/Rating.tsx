import React from 'react';
import { Star } from 'lucide-react';
interface RatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
}
export function Rating({
  rating,
  count,
  size = 'md'
}: RatingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  return <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`${sizes[size]} ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
      {count !== undefined && <span className="ml-2 text-sm text-gray-600">({count})</span>}
    </div>;
}
import React from 'react';
import { Chip } from '../ui/Chip';
import { travelCategories } from '@/lib/mockData';
export function TravelCategories() {
  return <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Travel Categories
          </h2>
          <p className="text-lg text-gray-600">
            Find travelers who share your interests
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {travelCategories.map(category => <Chip key={category.id} variant="gradient">
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Chip>)}
        </div>
      </div>
    </section>;
}
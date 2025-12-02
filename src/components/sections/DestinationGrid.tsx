import React from 'react';
import { Users } from 'lucide-react';
import { Card } from '../ui/Card';
import { destinations } from '@/lib/mockData';
export function DestinationGrid() {
  return <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-gray-600">
            Discover where travelers are heading next
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map(destination => <Card key={destination.id} hover>
              <div className="relative h-64">
                <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-200 mb-3">
                    {destination.country}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{destination.activeTravelers} active travelers</span>
                  </div>
                </div>
              </div>
            </Card>)}
        </div>
      </div>
    </section>;
}
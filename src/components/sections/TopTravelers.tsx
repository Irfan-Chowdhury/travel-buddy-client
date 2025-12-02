"use client";

import { useRouter } from "next/navigation";
import React from 'react';
import { Card } from '../ui/Card';
import { Rating } from '../ui/Rating';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { travelers } from '@/lib/mockData';

export function TopTravelers() {
  const router = useRouter();

  return <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top-Rated Travelers
          </h2>
          <p className="text-lg text-gray-600">
            Meet experienced travelers ready for new adventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelers.map(traveler => <Card key={traveler.id} hover>
              <div className="p-6">
                <img src={traveler.avatar} alt={traveler.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-lg font-bold text-gray-900 text-center mb-1">
                  {traveler.name}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-3">
                  {traveler.location}
                </p>
                <div className="flex justify-center mb-4">
                  <Rating rating={traveler.rating} count={traveler.reviewCount} size="sm" />
                </div>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {traveler.interests.slice(0, 3).map(interest => <Chip key={interest}>{interest}</Chip>)}
                </div>
                <Button variant="outline" size="sm" className="w-full" onClick={() => router(`/profile/${traveler.id}`)}>
                  View Profile
                </Button>
              </div>
            </Card>)}
        </div>
      </div>
    </section>;
}
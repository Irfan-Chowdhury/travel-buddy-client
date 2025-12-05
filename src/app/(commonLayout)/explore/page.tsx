"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { Chip } from "@/components/ui/Chip";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import { travelers, travelCategories } from "@/lib/mockData";
import { MapPin, Calendar } from "lucide-react";

export default function ExplorePage() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Find Your Travel Buddy
              </h1>
      
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1">
                  <Card>
                    <div className="p-6 space-y-6">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-4">Filters</h3>
                      </div>
      
                      <Input placeholder="Destination" label="Destination" />
      
                      <Input type="date" label="Start Date" />
      
                      <Input type="date" label="End Date" />
      
                      <Select label="Travel Type" options={[{
                      value: '',
                      label: 'All Types'
                    }, {
                      value: 'adventure',
                      label: 'Adventure'
                    }, {
                      value: 'food',
                      label: 'Food'
                    }, {
                      value: 'culture',
                      label: 'Culture'
                    }, {
                      value: 'budget',
                      label: 'Budget'
                    }]} />
      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Interests
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {travelCategories.map(category => <Chip key={category.id} active={selectedInterests.includes(category.name)} onClick={() => toggleInterest(category.name)}>
                              {category.name}
                            </Chip>)}
                        </div>
                      </div>
      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Age Range
                        </label>
                        <input type="range" min="18" max="65" className="w-full" />
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <span>18</span>
                          <span>65</span>
                        </div>
                      </div>
      
                      <Button className="w-full">Apply Filters</Button>
                    </div>
                  </Card>
                </aside>
      
                <main className="lg:col-span-3">
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-gray-600">
                      Found{' '}
                      <span className="font-bold text-gray-900">
                        {travelers.length}
                      </span>{' '}
                      travelers
                    </p>
                    <Select options={[{
                    value: 'rating',
                    label: 'Highest Rated'
                  }, {
                    value: 'recent',
                    label: 'Most Recent'
                  }, {
                    value: 'popular',
                    label: 'Most Popular'
                  }]} />
                  </div>
      
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {travelers.map(traveler => <Card key={traveler.id} hover>
                        <div className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <img src={traveler.avatar} alt={traveler.name} className="w-20 h-20 rounded-full object-cover" />
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 mb-1">
                                {traveler.name}, {traveler.age}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {traveler.location}
                              </p>
                              <Rating rating={traveler.rating} count={traveler.reviewCount} size="sm" />
                            </div>
                          </div>
      
                          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                            {traveler.bio}
                          </p>
      
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>Next trip: {traveler.upcomingTrip}</span>
                          </div>
      
                          <div className="flex flex-wrap gap-2 mb-4">
                            {traveler.interests.slice(0, 4).map(interest => <Chip key={interest}>{interest}</Chip>)}
                          </div>
      
                          <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/profile/${traveler.id}`)}>
                            View Profile
                          </Button>
                        </div>
                      </Card>)}
                  </div>
      
                  <div className="mt-8 flex justify-center gap-2">
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                    <Button size="sm">1</Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </main>
              </div>
            </div>
    </div>
  );
}

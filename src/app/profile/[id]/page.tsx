"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Rating } from "@/components/ui/Rating";
import { travelers, reviews, travelPlans } from "@/lib/mockData";
import { MapPin, Calendar, Globe } from "lucide-react";

type ProfilePageProps = {
  params: { id: string };
};

export default function ProfilePage({ params }: ProfilePageProps) {
  const router = useRouter();
  const travelerId = Number(params.id);

  const traveler = travelers.find((t) => t.id === travelerId) || travelers[0];
  const userTrips = travelPlans.filter((trip) => trip.hostId === traveler.id);
  const userReviews = reviews;
  // previously: const { id } = useParams(); const navigate = useNavigate();
  // now:
  // - use params.id
  // - use router.push("/trip/" + id) instead of navigate()

  return (
    <div className="min-h-screen bg-gray-50">
            <div className="relative h-64 md:h-80">
              <img src={traveler.cover} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
      
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative -mt-20 mb-8">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                  <img src={traveler.avatar} alt={traveler.name} className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover" />
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {traveler.name}, {traveler.age}
                    </h1>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-white mb-4">
                      <MapPin className="w-5 h-5" />
                      <span>{traveler.location}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                      <Rating rating={traveler.rating} count={traveler.reviewCount} />
                    </div>
                  </div>
                  <Button size="lg">Connect</Button>
                </div>
              </div>
      
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                <div className="lg:col-span-2 space-y-8">
                  <Card>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        About Me
                      </h2>
                      <p className="text-gray-700">{traveler.bio}</p>
                    </div>
                  </Card>
      
                  <Card>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Travel Interests
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {traveler.interests.map(interest => <Chip key={interest} variant="gradient">
                            {interest}
                          </Chip>)}
                      </div>
                    </div>
                  </Card>
      
                  <Card>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Upcoming Travel Plans
                      </h2>
                      <div className="space-y-4">
                        {userTrips.map(trip => <div key={trip.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => navigate(`/trip/${trip.id}`)}>
                            <img src={trip.image} alt={trip.destination} className="w-20 h-20 rounded-lg object-cover" />
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 mb-1">
                                {trip.destination}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{trip.startDate}</span>
                                </div>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                  {trip.travelType}
                                </span>
                              </div>
                            </div>
                          </div>)}
                      </div>
                    </div>
                  </Card>
      
                  <Card>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Reviews
                      </h2>
                      <div className="space-y-6">
                        {userReviews.map(review => <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                            <div className="flex items-start gap-4 mb-3">
                              <img src={review.reviewerAvatar} alt={review.reviewerName} className="w-12 h-12 rounded-full object-cover" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-bold text-gray-900">
                                    {review.reviewerName}
                                  </h4>
                                  <span className="text-sm text-gray-500">
                                    {review.date}
                                  </span>
                                </div>
                                <Rating rating={review.rating} size="sm" />
                              </div>
                            </div>
                            <p className="text-gray-700 mb-2">{review.comment}</p>
                            <p className="text-sm text-gray-500">
                              Trip: {review.tripDestination}
                            </p>
                          </div>)}
                      </div>
                    </div>
                  </Card>
                </div>
      
                <div className="space-y-6">
                  <Card>
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        Visited Countries
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {traveler.visitedCountries.map(country => <span key={country} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {country}
                          </span>)}
                      </div>
                    </div>
                  </Card>
      
                  <Card>
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Trips Completed</span>
                          <span className="font-bold text-gray-900">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Countries Visited</span>
                          <span className="font-bold text-gray-900">
                            {traveler.visitedCountries.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Member Since</span>
                          <span className="font-bold text-gray-900">2023</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
    </div>
  );
}

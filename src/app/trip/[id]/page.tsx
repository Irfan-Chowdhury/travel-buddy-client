"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { travelPlans, travelers } from "@/lib/mockData";
import { MapPin, Calendar, Users, DollarSign } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { Rating } from "@/components/ui/Rating";

type TripPageProps = {
  params: { id: string };
};

export default function TripDetailsPage({ params }: TripPageProps) {
  const tripId = Number(params.id);
  const trip = travelPlans.find((t) => t.id === tripId) || travelPlans[0];
  const host = travelers.find((t) => t.id === trip.hostId);
  const handleJoinRequest = () => {
    // setShowModal(false);
    // setMessage('');
    alert('Join request sent successfully!');
  };
  return (
    <div className="min-h-screen bg-gray-50">
            <div className="relative h-96">
              <img src={trip.image} alt={trip.destination} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="max-w-5xl mx-auto">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {trip.destination}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-white">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>
                        {trip.startDate} - {trip.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      <span>{trip.budget}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>
                        {trip.currentMembers}/{trip.groupSize} members
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <Card>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 text-white rounded-full text-sm font-medium">
                          {trip.travelType}
                        </span>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${trip.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {trip.status}
                        </span>
                      </div>
      
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        About This Trip
                      </h2>
                      <p className="text-gray-700 mb-6">{trip.description}</p>
      
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Itinerary
                      </h3>
                      <ul className="space-y-3">
                        {trip.itinerary.map((item, index) => <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </li>)}
                      </ul>
                    </div>
                  </Card>
      
                  <Card>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Interests
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {trip.interests.map(interest => <Chip key={interest} variant="gradient">
                            {interest}
                          </Chip>)}
                      </div>
                    </div>
                  </Card>
                </div>
      
                <div className="space-y-6">
                  <Card>
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-4">Trip Host</h3>
                      <div className="flex items-center gap-4 mb-4">
                        <img src={host.avatar} alt={host.name} className="w-16 h-16 rounded-full object-cover" />
                        <div>
                          <h4 className="font-bold text-gray-900">{host.name}</h4>
                          <p className="text-sm text-gray-600">{host.location}</p>
                        </div>
                      </div>
                      <Rating rating={host.rating} count={host.reviewCount} size="sm" />
                      <p className="text-gray-700 text-sm mt-4 mb-4">{host.bio}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        View Host Profile
                      </Button>
                    </div>
                  </Card>
      
                  <Card>
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-4">Trip Details</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Destination</span>
                          <span className="font-medium text-gray-900">
                            {trip.destination}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-medium text-gray-900">10 days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Budget Range</span>
                          <span className="font-medium text-gray-900">
                            {trip.budget}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Group Size</span>
                          <span className="font-medium text-gray-900">
                            {trip.groupSize} people
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Spots Left</span>
                          <span className="font-medium text-green-600">
                            {trip.groupSize - trip.currentMembers} available
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
      
                  <Button size="lg" className="w-full" onClick={() => setShowModal(true)}>
                    Request to Join
                  </Button>
                </div>
              </div>
            </div>
      
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Request to Join Trip">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Send a message to {host.name} explaining why you'd be a great travel
                  companion for this trip.
                </p>
                <textarea className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none" rows={5} placeholder="Tell the host about yourself and why you want to join..." value={message} onChange={e => setMessage(e.target.value)} />
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={handleJoinRequest}>
                    Send Request
                  </Button>
                </div>
              </div>
            </Modal>
    </div>
  );
}

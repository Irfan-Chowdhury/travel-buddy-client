"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { travelPlans, travelers } from "@/lib/mockData";
import {
  Home,
  Plane,
  Users,
  MessageSquare,
  Bell,
  Settings,
  Plus,
  Calendar,
  MapPin,
} from "lucide-react";
import { Rating } from "@/components/ui/Rating";
import ProtectedRoute from "../../../../components/auth/ProtectedRoute";

export default function DashboardPage() {
  const router = useRouter();
  const currentUser = travelers[0];
  const userTrips = travelPlans.filter(
    (trip) => trip.hostId === currentUser.id
  );
  const matches = travelers.slice(1, 4);

  // Where you had navigate('/trip/' + id) → router.push(`/trip/${id}`)

  const menuItems = [{
    icon: Home,
    label: 'Overview',
    active: true
  }, {
    icon: Plane,
    label: 'My Trips',
    active: false
  }, {
    icon: Users,
    label: 'Matches',
    active: false
  }, {
    icon: MessageSquare,
    label: 'Messages',
    active: false
  }, {
    icon: Bell,
    label: 'Notifications',
    active: false
  }, {
    icon: Settings,
    label: 'Settings',
    active: false
  }];

  return (

    <ProtectedRoute role="user">
      <div className="min-h-screen bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <aside className="lg:col-span-1">
                    <Card>
                      <div className="p-6">
                        <div className="text-center mb-6">
                          <img src={currentUser.avatar} alt={currentUser.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                          <h3 className="font-bold text-gray-900 mb-1">
                            {currentUser.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {currentUser.location}
                          </p>
                          <Rating rating={currentUser.rating} count={currentUser.reviewCount} size="sm" />
                        </div>
        
                        <nav className="space-y-2">
                          {menuItems.map(item => <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.active ? 'bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                              <item.icon className="w-5 h-5" />
                              <span className="font-medium">{item.label}</span>
                            </button>)}
                        </nav>
                      </div>
                    </Card>
                  </aside>
        
                  <main className="lg:col-span-3 space-y-8">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                          Dashboard Overview
                        </h1>
                        <Button>
                          <Plus className="w-5 h-5 mr-2" />
                          Create Trip
                        </Button>
                      </div>
        
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card>
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-gray-600 text-sm font-medium">
                                Upcoming Trips
                              </h3>
                              <Plane className="w-5 h-5 text-blue-500" />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">
                              {userTrips.length}
                            </p>
                          </div>
                        </Card>
        
                        <Card>
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-gray-600 text-sm font-medium">
                                New Matches
                              </h3>
                              <Users className="w-5 h-5 text-teal-500" />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">12</p>
                          </div>
                        </Card>
        
                        <Card>
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-gray-600 text-sm font-medium">
                                Unread Messages
                              </h3>
                              <MessageSquare className="w-5 h-5 text-purple-500" />
                            </div>
                            <p className="text-3xl font-bold text-gray-900">5</p>
                          </div>
                        </Card>
                      </div>
                    </div>
        
                    <Card>
                      <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                          Your Upcoming Trips
                        </h2>
                        <div className="space-y-4">
                          {userTrips.map(trip => <div key={trip.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => navigate(`/trip/${trip.id}`)}>
                              <img src={trip.image} alt={trip.destination} className="w-24 h-24 rounded-lg object-cover" />
                              <div className="flex-1">
                                <h3 className="font-bold text-gray-900 mb-2">
                                  {trip.destination}
                                </h3>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{trip.startDate}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    <span>
                                      {trip.currentMembers}/{trip.groupSize} members
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Manage
                              </Button>
                            </div>)}
                        </div>
                      </div>
                    </Card>
        
                    <Card>
                      <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                          Recent Matches
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {matches.map(match => <div key={match.id} className="p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => navigate(`/profile/${match.id}`)}>
                              <img src={match.avatar} alt={match.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
                              <h3 className="font-bold text-gray-900 text-center mb-1">
                                {match.name}
                              </h3>
                              <p className="text-sm text-gray-600 text-center mb-3">
                                {match.location}
                              </p>
                              <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                                <MapPin className="w-4 h-4" />
                                <span className="text-xs">{match.upcomingTrip}</span>
                              </div>
                              <Button variant="outline" size="sm" className="w-full">
                                View Profile
                              </Button>
                            </div>)}
                        </div>
                      </div>
                    </Card>
        
                    <Card>
                      <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                          Notifications
                        </h2>
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-900 font-medium mb-1">
                                New match found!
                              </p>
                              <p className="text-sm text-gray-600">
                                Marcus Johnson wants to connect for your Barcelona trip
                              </p>
                              <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
                            </div>
                          </div>
        
                          <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                              <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-900 font-medium mb-1">
                                New message
                              </p>
                              <p className="text-sm text-gray-600">
                                Emma Rodriguez sent you a message about Tokyo trip
                              </p>
                              <p className="text-xs text-gray-500 mt-2">5 hours ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </main>
                </div>
              </div>
      </div>
    </ProtectedRoute>
  );
}

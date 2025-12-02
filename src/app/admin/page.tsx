"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { adminStats, adminUsers, travelPlans } from "@/lib/mockData";
import {
  Users,
  Plane,
  AlertTriangle,
  UserPlus,
  Star,
  MoreVertical,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Admin Dashboard
              </h1>
      
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-600 text-sm font-medium">
                        Total Users
                      </h3>
                      <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      {adminStats.totalUsers.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 mt-2">
                      ↑ 12% from last month
                    </p>
                  </div>
                </Card>
      
                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-600 text-sm font-medium">
                        Active Trips
                      </h3>
                      <Plane className="w-5 h-5 text-teal-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      {adminStats.activeTrips}
                    </p>
                    <p className="text-sm text-green-600 mt-2">
                      ↑ 8% from last month
                    </p>
                  </div>
                </Card>
      
                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-600 text-sm font-medium">Reports</h3>
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      {adminStats.totalReports}
                    </p>
                    <p className="text-sm text-red-600 mt-2">Needs attention</p>
                  </div>
                </Card>
      
                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-600 text-sm font-medium">
                        New Signups
                      </h3>
                      <UserPlus className="w-5 h-5 text-purple-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      {adminStats.newSignups}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">This week</p>
                  </div>
                </Card>
      
                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-600 text-sm font-medium">
                        Total Reviews
                      </h3>
                      <Star className="w-5 h-5 text-yellow-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      {adminStats.totalReviews.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">Avg: 4.8 stars</p>
                  </div>
                </Card>
              </div>
      
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">
                        User Management
                      </h2>
                      <Button size="sm">Export</Button>
                    </div>
      
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                              User
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                              Email
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                              Status
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                              Trips
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {adminUsers.map(user => <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-3 px-4">
                                <div className="font-medium text-gray-900">
                                  {user.name}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {user.email}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                  {user.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {user.trips}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                  <MoreVertical className="w-4 h-4 text-gray-600" />
                                </button>
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card>
      
                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">
                        Travel Plans
                      </h2>
                      <Button size="sm">View All</Button>
                    </div>
      
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                              Destination
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                              Date
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                              Status
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {travelPlans.map(trip => <tr key={trip.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-3 px-4">
                                <div className="font-medium text-gray-900">
                                  {trip.destination}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {trip.travelType}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {trip.startDate}
                              </td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                  {trip.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                  <MoreVertical className="w-4 h-4 text-gray-600" />
                                </button>
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
    </div>
  );
}

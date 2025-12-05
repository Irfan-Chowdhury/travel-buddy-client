"use client";

import { useState } from "react";
import { Users, Plane, AlertCircle, UserPlus, Star } from "lucide-react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Navbar } from "@/components/admin/Navbar";
import { StatsCard } from "@/components/admin/StatsCard";
import { UserTable } from "@/components/admin/UserTable";
import { TravelPlanTable } from "@/components/admin/TravelPlanTable";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserTable />;
      case "travel-plans":
        return <TravelPlanTable />;
      default:
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Users"
                value="12,847"
                trend="12% from last month"
                trendUp={true}
                icon={Users}
                iconColor="text-blue-600"
                iconBgColor="bg-blue-100"
              />

              <StatsCard
                title="Active Trips"
                value="342"
                trend="8% from last month"
                trendUp={true}
                icon={Plane}
                iconColor="text-teal-600"
                iconBgColor="bg-teal-100"
              />

              <StatsCard
                title="Reports"
                value="23"
                description="Needs attention"
                icon={AlertCircle}
                iconColor="text-red-600"
                iconBgColor="bg-red-100"
              />

              <StatsCard
                title="New Signups"
                value="156"
                description="This week"
                icon={UserPlus}
                iconColor="text-purple-600"
                iconBgColor="bg-purple-100"
              />

              <StatsCard
                title="Total Reviews"
                value="8,934"
                description="Avg: 4.8 stars"
                icon={Star}
                iconColor="text-yellow-600"
                iconBgColor="bg-yellow-100"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <UserTable />
              <TravelPlanTable />
            </div>
          </>
        );
    }
  };

  return (
    <div>
      {/* <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Navbar /> */}

        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === "dashboard"
                ? "Admin Dashboard"
                : activeTab === "users"
                ? "User Management"
                : activeTab === "travel-plans"
                ? "Travel Plans"
                : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>

            <p className="text-gray-500 mt-1">
              Welcome back, Admin. Here's what's happening today.
            </p>
          </div>

          {renderContent()}
        </div>
    </div>
  );
}

"use client";

import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  description?: string;
  icon: LucideIcon;       // FIXED ✔
  iconColor: string;
  iconBgColor: string;
}

export function StatsCard({
  title,
  value,
  trend,
  trendUp,
  description,
  icon: Icon,
  iconColor,
  iconBgColor,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
        </div>

        <div className={`p-3 rounded-lg ${iconBgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>

      {(trend || description) && (
        <div className="mt-4 flex items-center text-sm">
          {trend && (
            <span
              className={`font-medium ${
                trendUp ? "text-green-600" : "text-red-600"
              } flex items-center`}
            >
              {trendUp ? "↑" : "↓"} {trend}
            </span>
          )}

          {description && <span className="text-gray-500 ml-2">{description}</span>}
        </div>
      )}
    </div>
  );
}

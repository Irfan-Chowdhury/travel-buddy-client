import React from 'react';
import { Search, Calendar, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
export function Hero() {
  return <div className="relative bg-gradient-to-br from-blue-500 via-teal-500 to-purple-600 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Travel Buddy
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-50">
            Connect with like-minded travelers and explore the world together
          </p>

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Where to?" className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900" />
              </div>

              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="date" placeholder="Start Date" className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900" />
              </div>

              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="date" placeholder="End Date" className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900" />
              </div>
            </div>

            <Button size="lg" className="w-full md:w-auto">
              <Search className="w-5 h-5 mr-2" />
              Find Travel Partners
            </Button>
          </div>
        </div>
      </div>
    </div>;
}
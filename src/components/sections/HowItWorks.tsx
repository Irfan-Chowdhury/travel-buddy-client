import React, { memo } from 'react';
import { UserPlus, Users, Plane } from 'lucide-react';
export function HowItWorks() {
  const steps = [{
    icon: UserPlus,
    title: 'Create Profile',
    description: 'Sign up and tell us about your travel interests and preferences'
  }, {
    icon: Users,
    title: 'Match with Travelers',
    description: 'Browse and connect with compatible travel companions'
  }, {
    icon: Plane,
    title: 'Explore Together',
    description: 'Plan your adventure and create unforgettable memories'
  }];
  return <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Start your journey in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 text-white mb-6">
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
}
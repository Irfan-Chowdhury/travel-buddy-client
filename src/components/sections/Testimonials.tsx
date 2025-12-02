import React from 'react';
import { Card } from '../ui/Card';
import { Rating } from '../ui/Rating';
import { testimonials } from '@/lib/mockData';
export function Testimonials() {
  return <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Travelers Say
          </h2>
          <p className="text-lg text-gray-600">
            Real experiences from our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(testimonial => <Card key={testimonial.id}>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <Rating rating={testimonial.rating} size="sm" />
                <p className="mt-4 text-gray-700 italic">
                  "{testimonial.text}"
                </p>
              </div>
            </Card>)}
        </div>
      </div>
    </section>;
}
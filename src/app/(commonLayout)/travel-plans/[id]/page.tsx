"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import toast from "react-hot-toast";
import type { TravelPlan } from "@/lib/api";

export default function TravelPlanDetails() {
  const params = useParams();
  const id = params?.id as string;

  const [trip, setTrip] = useState<TravelPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchPlan() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/travel-plans/${id}`,
          { cache: "no-store" }
        );

        const data = await res.json();

        if (!res.ok) throw data;

        // data.data should be a single TravelPlan
        setTrip(data.data);
      } catch (error: any) {
        toast.error("Failed to load trip details");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPlan();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading trip details...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Trip not found
      </div>
    );
  }

  // Format date → Dec 10, 2025
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Make sure itinerary is always an array
  const itineraryItems = Array.isArray(trip.itinerary) ? trip.itinerary : [];

  // Duration in days (at least 1)
  const durationDays = Math.max(
    1,
    Math.ceil(
      (new Date(trip.end_date).getTime() -
        new Date(trip.start_date).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-black">
        <img
          src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c"
          alt={trip.destination}
          className="w-full h-full object-cover opacity-80"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-5xl mx-auto text-white">
            {/* Title + Destination */}
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {trip.title || trip.destination}
            </h1>
            <p className="text-sm md:text-base text-gray-200 mb-4">
              {trip.destination}
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {formatDate(trip.start_date)} → {formatDate(trip.end_date)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span>
                  {trip.budget ? `$${trip.budget}` : "Budget not set"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{trip.group_size} people</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <div className="p-6">
                {/* Tags */}
                <div className="flex items-center gap-3 mb-6">
                  {trip.travel_type && (
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 text-white rounded-full text-sm font-medium">
                      {trip.travel_type}
                    </span>
                  )}

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      trip.status === "active"
                        ? "bg-green-100 text-green-700"
                        : trip.status === "completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {trip.status}
                  </span>
                </div>

                {/* About This Trip */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About This Trip
                </h2>

                {trip.short_description && (
                  <p className="text-gray-700 mb-6">
                    {trip.short_description}
                  </p>
                )}

                {/* Itinerary list */}
                {itineraryItems.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Itinerary
                    </h3>

                    <ul className="space-y-3">
                      {itineraryItems.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <div className="p-6 space-y-3 text-sm">
                <h3 className="font-bold text-gray-900 mb-4">Trip Details</h3>

                <div className="flex justify-between">
                  <span className="text-gray-600">Destination</span>
                  <span className="font-medium">{trip.destination}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">
                    {durationDays} {durationDays === 1 ? "day" : "days"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Budget</span>
                  <span className="font-medium">
                    {trip.budget ? `$${trip.budget}` : "Not set"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Group Size</span>
                  <span className="font-medium">{trip.group_size}</span>
                </div>
              </div>
            </Card>

            {/* Join Button */}
            <Button
              size="lg"
              className="w-full"
              onClick={() => setShowModal(true)}
            >
              Request to Join
            </Button>
          </div>
        </div>
      </div>

      {/* Join Request Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Request to Join Trip"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Send a message to the trip organizer explaining why you'd like to
            join.
          </p>

          <textarea
            className="w-full px-4 py-3 rounded-xl border resize-none"
            rows={5}
            placeholder="Tell about yourself..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>

            <Button
              className="flex-1"
              onClick={() => {
                toast.success("Join request sent!");
                setShowModal(false);
                setMessage("");
              }}
            >
              Send Request
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

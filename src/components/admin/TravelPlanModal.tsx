"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import type { TravelPlan } from "@/lib/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: TravelPlan | null;
}

export function TravelPlanModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [steps, setSteps] = useState<string[]>([]); // <-- FIXED: Always initialized safely

  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelType: "Solo",
    status: "active",
    groupSize: "1",
  });

  // Load initial data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title ?? "",
        short_description: initialData.short_description ?? "",
        destination: initialData.destination ?? "",
        startDate: initialData.start_date ?? "",
        endDate: initialData.end_date ?? "",
        budget: initialData.budget ? String(initialData.budget) : "",
        travelType: initialData.travel_type ?? "Solo",
        status: initialData.status ?? "active",
        groupSize: initialData.group_size
          ? String(initialData.group_size)
          : "1",
      });

      setSteps(
        Array.isArray(initialData.itinerary)
          ? initialData.itinerary
          : []
      );
    } else {
      // RESET for Add New
      setFormData({
        title: "",
        short_description: "",
        destination: "",
        startDate: "",
        endDate: "",
        budget: "",
        travelType: "Solo",
        status: "active",
        groupSize: "1",
      });

      setSteps([]); // <-- FIXED
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      user_id: 1,
      title: formData.title,
      short_description: formData.short_description,
      destination: formData.destination,
      start_date: formData.startDate,
      end_date: formData.endDate,
      budget: formData.budget ? Number(formData.budget) : null,
      travel_type: formData.travelType,
      status: formData.status,
      group_size: Number(formData.groupSize),
      itinerary: steps, // JSON array
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between p-6 border-b">
          <h2 className="text-xl font-bold">
            {initialData ? "Edit Travel Plan" : "Create Travel Plan"}
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Title */}
            <div className="md:col-span-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            {/* Short Description */}
            <div className="md:col-span-2">
              <Label>Short Description</Label>
              <textarea
                rows={3}
                className="w-full border p-2 rounded"
                value={formData.short_description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    short_description: e.target.value,
                  })
                }
              />
            </div>

            {/* Destination */}
            <div className="md:col-span-2">
              <Label>Destination</Label>
              <Input
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>

            {/* End Date */}
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>

            {/* Budget */}
            <div>
              <Label>Budget ($)</Label>
              <Input
                type="number"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
              />
            </div>

            {/* Group Size */}
            <div>
              <Label>Group Size</Label>
              <Input
                type="number"
                min={1}
                value={formData.groupSize}
                onChange={(e) =>
                  setFormData({ ...formData, groupSize: e.target.value })
                }
              />
            </div>

            {/* Travel Type */}
            <div>
              <Label>Travel Type</Label>
              <select
                className="border rounded px-3 py-2 w-full"
                value={formData.travelType}
                onChange={(e) =>
                  setFormData({ ...formData, travelType: e.target.value })
                }
              >
                <option value="Solo">Solo</option>
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
                <option value="Group">Group</option>
                <option value="Couple">Couple</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <Label>Status</Label>
              <select
                className="border rounded px-3 py-2 w-full"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* ITINERARY STEPS */}
            <div className="md:col-span-2">
              <Label>Itinerary Steps</Label>

              {steps.map((step, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={step}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[index] = e.target.value;
                      setSteps(updated);
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setSteps(steps.filter((_, i) => i !== index))
                    }
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                onClick={() => setSteps([...steps, ""])}
              >
                + Add Step
              </Button>
            </div>

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              {initialData ? "Save Changes" : "Create Plan"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}

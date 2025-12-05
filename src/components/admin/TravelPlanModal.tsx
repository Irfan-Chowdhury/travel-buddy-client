"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

interface TravelPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

export function TravelPlanModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: TravelPlanModalProps) {
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    minBudget: "",
    maxBudget: "",
    type: "Solo",
    description: "",
    status: "active",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        destination: initialData.destination || "",
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
        minBudget: initialData.budget?.min || "",
        maxBudget: initialData.budget?.max || "",
        type: initialData.type || "Solo",
        description: initialData.description || "",
        status: initialData.status || "active",
      });
    } else {
      setFormData({
        destination: "",
        startDate: "",
        endDate: "",
        minBudget: "",
        maxBudget: "",
        type: "Solo",
        description: "",
        status: "active",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      budget: {
        min: Number(formData.minBudget),
        max: Number(formData.maxBudget),
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? "Edit Travel Plan" : "Create Travel Plan"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Destination */}
            <div className="md:col-span-2">
              <Label htmlFor="destination" required>
                Destination
              </Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
                placeholder="e.g. Tokyo, Japan"
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <Label htmlFor="startDate" required>
                Start Date
              </Label>
              <Input
                id="startDate"
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
              <Label htmlFor="endDate" required>
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>

            {/* Min Budget */}
            <div>
              <Label htmlFor="minBudget">Min Budget ($)</Label>
              <Input
                id="minBudget"
                type="number"
                value={formData.minBudget}
                onChange={(e) =>
                  setFormData({ ...formData, minBudget: e.target.value })
                }
                placeholder="1000"
              />
            </div>

            {/* Max Budget */}
            <div>
              <Label htmlFor="maxBudget">Max Budget ($)</Label>
              <Input
                id="maxBudget"
                type="number"
                value={formData.maxBudget}
                onChange={(e) =>
                  setFormData({ ...formData, maxBudget: e.target.value })
                }
                placeholder="5000"
              />
            </div>

            {/* Type */}
            <div>
              <Label htmlFor="type">Travel Type</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900"
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
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Label htmlFor="description">Itinerary / Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
                placeholder="Describe the trip plan..."
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
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

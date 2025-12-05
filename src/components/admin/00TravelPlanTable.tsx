"use client";

import { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "../ui/Button";
import { TravelPlanModal } from "./TravelPlanModal";

interface TravelPlan {
  id: string;
  destination: string;
  type: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "cancelled" | "draft";
  budget: {
    min: number;
    max: number;
  };
  description?: string;
}

const MOCK_PLANS: TravelPlan[] = [
  {
    id: "1",
    destination: "Tokyo, Japan",
    type: "Adventure",
    startDate: "2024-06-15",
    endDate: "2024-06-25",
    status: "active",
    budget: { min: 2000, max: 4000 },
  },
  {
    id: "2",
    destination: "Barcelona, Spain",
    type: "Culture",
    startDate: "2024-07-01",
    endDate: "2024-07-10",
    status: "active",
    budget: { min: 1500, max: 3000 },
  },
  {
    id: "3",
    destination: "Bali, Indonesia",
    type: "Relaxation",
    startDate: "2024-08-10",
    endDate: "2024-08-20",
    status: "draft",
    budget: { min: 1000, max: 2000 },
  },
];

export function TravelPlanTable() {
  const [plans, setPlans] = useState<TravelPlan[]>(MOCK_PLANS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<TravelPlan | undefined>();

  const handleAdd = () => {
    setEditingPlan(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (plan: TravelPlan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      setPlans((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (data: any) => {
    if (editingPlan) {
      // Update existing plan
      setPlans((prev) =>
        prev.map((p) =>
          p.id === editingPlan.id
            ? { ...p, ...data }
            : p
        )
      );
    } else {
      // Add new plan
      setPlans((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          ...data,
        },
      ]);
    }
  };

  const getStatusColor = (status: TravelPlan["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "draft":
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Travel Plans</h2>
          <p className="text-sm text-gray-500">
            Manage upcoming and past trips
          </p>
        </div>

        <Button onClick={handleAdd} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Plan
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {plans.map((plan) => (
              <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {plan.destination}
                    </p>
                    <p className="text-xs text-gray-500">{plan.type}</p>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {plan.startDate}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  ${plan.budget.min} - ${plan.budget.max}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                      plan.status
                    )}`}
                  >
                    {plan.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="p-1.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <TravelPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingPlan}
      />
    </div>
  );
}

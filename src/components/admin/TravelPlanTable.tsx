"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import {
  getTravelPlans,
  createTravelPlan,
  updateTravelPlan,
  deleteTravelPlan,
  TravelPlan,
} from "@/lib/api";
import { Button } from "../ui/Button";
import { TravelPlanModal } from "./TravelPlanModal";

export function TravelPlanTable() {
  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<TravelPlan | undefined>();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadPlans(page);
  }, [page]);

  async function loadPlans(page: number) {
    try {
      setLoading(true);
      const res = await getTravelPlans(page);
      setPlans(res?.data?.data ?? []);
      setPagination(res?.data ?? null);
    } catch {
      toast.error("Failed to load travel plans");
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = () => {
    setEditingPlan(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (plan: TravelPlan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;

    try {
      await deleteTravelPlan(id);
      toast.success("Travel plan deleted");
      await loadPlans(page);
    } catch {
      toast.error("Delete failed");
    }
  };

  function formatDate(dateString: string) {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }


  // create or update
  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);

      if (editingPlan) {
        // UPDATE
        const res = await updateTravelPlan(editingPlan.id, data);
        toast.success(res.message || "Travel plan updated");
      } else {
        // CREATE
        const res = await createTravelPlan(data);
        toast.success(res.message || "Travel plan created");
      }

      await loadPlans(page);
      setIsModalOpen(false);
    } catch (error: any) {
      if (error?.status === 422 && error?.data?.errors) {
        Object.values(error.data.errors).forEach((messages: any) => {
          (messages as string[]).forEach((msg) => toast.error(msg));
        });
      } else {
        toast.error(error?.data?.message || "Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
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
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading travel plans...</div>
    );
  }

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

        <Button
          onClick={handleAdd}
          className="bg-teal-600 hover:bg-teal-700"
          disabled={isSubmitting}
        >
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
                Title
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Dates
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
                <td className="px-6 py-4 text-sm text-gray-600">
                  {plan.title}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {plan.destination}
                    </p>
                    <p className="text-xs text-gray-500">
                      {plan.travel_type || "—"}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatDate(plan.start_date)} → {formatDate(plan.end_date)}
                </td>




                <td className="px-6 py-4 text-sm text-gray-600">
                  {plan.budget ? `$${plan.budget}` : "Not set"}
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

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-center gap-2 p-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-3 py-1 rounded ${
              page === 1
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(
            (num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-3 py-1 rounded border ${
                  num === page
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white hover:bg-gray-100 border-gray-300"
                }`}
              >
                {num}
              </button>
            )
          )}

          <button
            disabled={page === pagination.last_page}
            onClick={() => setPage(page + 1)}
            className={`px-3 py-1 rounded ${
              page === pagination.last_page
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      )}

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

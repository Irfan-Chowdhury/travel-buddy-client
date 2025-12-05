"use client";

import { useEffect, useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { getUsers, createUser, deleteUserApi, updateUser } from "@/lib/api";
import { Button } from "../ui/Button";
import { UserModal } from "./UserModal";

interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  bio?: string;
  imageUrl?: string;
}

export function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔥 Load users from API
  useEffect(() => {
    loadUsers(page);
  }, [page]);

  async function loadUsers(page: number) {
    try {
      setLoading(true);
      const res = await getUsers(page);
        console.log("Get users response:", res.data);

      setUsers(res.data.data);
      setPagination(res.data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  const handleAdd = () => {
    setEditingUser(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await deleteUserApi(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success(res.message || "User deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔥 Create or Update user
const handleSubmit = async (data: any) => {
  try {
    setIsSubmitting(true);

    // UPDATE
    if (editingUser) {
        const form = new FormData();
        form.append("name", data.name);
        form.append("email", data.email);
        form.append("bio", data.bio ?? "");
        form.append("location", data.location ?? "");

        if (data.image instanceof File) {
            form.append("image", data.image);
        }

        const res = await updateUser(editingUser.id, form);

        toast.success("User updated");
        await loadUsers(page);
        setIsModalOpen(false);
        return;
    }


    // CREATE — use FormData
    const form = new FormData();
    form.append("name", data.name);
    form.append("email", data.email);
    if (data.bio) form.append("bio", data.bio);
    if (data.location) form.append("location", data.location);
    if (data.status) form.append("status", data.status);

    if (data.image instanceof File) {
      form.append("image", data.image);
    }

    const res = await createUser(form);

    toast.success("User created");

    // 🔥 reload updated list
    await loadUsers(page);

    setIsModalOpen(false);

  } catch (error: any) {
    if (error?.status === 422 && error?.data?.errors) {
      Object.values(error.data.errors).forEach((messages: any) => {
        (messages as string[]).forEach((msg) => toast.error(msg));
      });
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    setIsSubmitting(false);
  }
};



  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading users...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">User Management</h2>
          <p className="text-sm text-gray-500">Manage user profiles</p>
        </div>

        <Button
          onClick={handleAdd}
          className="bg-teal-600 hover:bg-teal-700"
          disabled={isSubmitting}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4 text-xs font-semibold uppercase">User</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase">Email</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    
                    {/* Image OR fallback avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-teal-100 flex items-center justify-center text-teal-700">
                      {user.imageUrl ? (
                        <img 
                          // src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${user.imageUrl}`} 
                          src={`${user.imageUrl}`} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.name.charAt(0)
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.location}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.email}
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(user)} className="p-1.5 hover:text-teal-600">
                      <Edit className="w-4 h-4" />
                    </button>

                    <button onClick={() => handleDelete(user.id)} className="p-1.5 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty */}
        {users.length === 0 && (
          <div className="text-center py-6 text-gray-500">No users found</div>
        )}
      </div>

        {/* Number Pagination */}
        <div className="flex justify-center gap-2 p-4">

        {/* Previous Button */}
        <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-3 py-1 rounded ${
            page === 1 ? "bg-gray-200 text-gray-400" : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
            Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((num) => (
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
        ))}

        {/* Next Button */}
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


      {/* Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingUser}
      />
    </div>
  );
}

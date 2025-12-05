"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { ImageUpload } from "../ImageUpload";

export function UserModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    interests: "",
    countries: "",
    location: "",
    status: "active",
    image: null,
  });

useEffect(() => {
  if (initialData) {
    // Edit Mode → fill fields with user data
    setFormData({
      name: initialData.name ?? "",
      email: initialData.email ?? "",
      bio: initialData.bio ?? "",
      interests: initialData.interests ?? "",
      countries: initialData.countries ?? "",
      location: initialData.location ?? "",
      status: initialData.status ?? "active",
      image: null,
    });
  } else {
    // Add Mode → reset form
    setFormData({
      name: "",
      email: "",
      bio: "",
      interests: "",
      countries: "",
      location: "",
      status: "active",
      image: null,
    });
  }
}, [initialData, isOpen]);


  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting form data:", formData);

    onSubmit({
      ...formData,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between p-6 border-b">
          <h2 className="text-xl font-bold">
            {initialData ? "Edit User" : "Add New User"}
          </h2>

          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Image */}
          <ImageUpload
            value={formData.image}
            onChange={(file) => setFormData({ ...formData, image: file })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  required
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            {/* Right */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              {initialData ? "Save Changes" : "Create User"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}

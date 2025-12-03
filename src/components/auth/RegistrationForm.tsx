"use client";

import React, { useState } from "react";
import { User, Mail, Lock, MapPin, Calendar, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import { ImageUpload } from "../ImageUpload";

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    age: "",
    image: null as File | null,
  });

  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.age) newErrors.age = "Age is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("password", formData.password);
      fd.append("location", formData.location);
      fd.append("age", formData.age);

      if (formData.image) {
        fd.append("avatar", formData.image);
      }

      const res = await fetch("http://127.0.0.1:8000/api/v1/auth/register", {
        method: "POST",
        body: fd,
      });

      const json = await res.json();
      console.log(json);

      if (!json.success) {
        alert(json.message || "Registration failed");
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      console.error("Registration Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      const updated = { ...errors };
      delete updated[e.target.name];
      setErrors(updated);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 px-4">
        <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
        <p className="text-gray-500 mb-8">
          Welcome aboard, {formData.name}. Your account has been created successfully.
        </p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Register Another Account
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <Label htmlFor="name" required>Full Name</Label>
            <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} error={errors.name} icon={<User />} />
          </div>

          <div>
            <Label htmlFor="email" required>Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} icon={<Mail />} />
          </div>

          <div>
            <Label htmlFor="password" required>Password</Label>
            <div className="relative">
              <Input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} error={errors.password} icon={<Lock />} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5">
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age" required>Age</Label>
              <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} error={errors.age} icon={<Calendar />} />
            </div>

            <div>
              <Label htmlFor="location" required>Location</Label>
              <Input id="location" name="location" type="text" value={formData.location} onChange={handleChange} error={errors.location} icon={<MapPin />} />
            </div>
          </div>

          {/* Image Upload */}
          <ImageUpload
            value={formData.image}
            onChange={(file) => setFormData((prev) => ({ ...prev, image: file }))}
            error={errors.image}
          />
        </div>
      </div>

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Create Account
      </Button>
    </form>
  );
}

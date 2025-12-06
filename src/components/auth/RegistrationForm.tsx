"use client";

import React, { useState } from "react";
import { User, Mail, Lock, MapPin, Calendar, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
import { ImageUpload } from "../ImageUpload";
import toast from "react-hot-toast";

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
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

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = "Passwords do not match";

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
      fd.append("password_confirmation", formData.confirm_password); // Laravel name
      fd.append("location", formData.location);
      fd.append("age", formData.age);

      if (formData.image) {
        fd.append("avatar", formData.image);
      }

      // const res = await fetch("http://127.0.0.1:8000/api/v1/auth/register", {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        body: fd,
      });

      const json = await res.json();
      console.log(json);

      if (!json.success) {
        toast.error(json.message ?? "Registration failed");
        return;
      }
      
      toast.success("Registration successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        location: "",
        age: "",
        image: null,
      });

      setErrors({});

      setIsSuccess(true);

    } catch (err) {
      console.error("Registration Error:", err);
      toast.error("Something went wrong.");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">

        <div>
          <Label htmlFor="name" required>Full Name</Label>
          <Input id="name" name="name" type="text"
            value={formData.name} onChange={handleChange}
            error={errors.name} icon={<User />} />
        </div>

        <div>
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" name="email" type="email"
            value={formData.email} onChange={handleChange}
            error={errors.email} icon={<Mail />} />
        </div>

        <div>
          <Label htmlFor="password" required>Password</Label>
          <div className="relative">
            <Input id="password" name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password} onChange={handleChange}
              error={errors.password} icon={<Lock />} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5">
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <Label htmlFor="confirm_password" required>Confirm Password</Label>
          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
            value={formData.confirm_password}
            onChange={handleChange}
            error={errors.confirm_password}
            icon={<Lock />}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <Label htmlFor="age" required>Age</Label>
            <Input id="age" name="age" type="number"
              value={formData.age} onChange={handleChange}
              error={errors.age} icon={<Calendar />} />
          </div>

          <div>
            <Label htmlFor="location" required>Location</Label>
            <Input id="location" name="location" type="text"
              value={formData.location} onChange={handleChange}
              error={errors.location} icon={<MapPin />} />
          </div>

        </div>

        {/* Image Upload Component */}
        <ImageUpload
          value={formData.image}
          onChange={(file) => setFormData((prev) => ({ ...prev, image: file }))}
        />

      </div>

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Create Account
      </Button>
    </form>
  );
}

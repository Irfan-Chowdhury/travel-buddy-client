"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const router = useRouter();

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate()) return;

  setIsSubmitting(true);

  try {

    const formBody = new FormData();
    formBody.append("email", formData.email);
    formBody.append("password", formData.password);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formBody,
    });

    const json = await res.json();

    if (!json.success) {
      toast.error(json.message || "Login failed");
      return;
    }

    toast.success("Login successful!");

    // Save token in localStorage
    localStorage.setItem("token", json.data.token);
    localStorage.setItem("user", JSON.stringify(json.data.user));
    
    // Reset form
    setFormData({
      email: "",
      password: "",
      rememberMe: false,
    });

    setErrors({});

    // Redirect according to user role
    const role = json.data.user.role;

    if (role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/user/dashboard");
    }

  } catch (error) {
    console.error("Login failed:", error);
    toast.error("Something went wrong");
  } finally {
    setIsSubmitting(false);
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name as keyof FormErrors];
        return updated;
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 px-4 animate-in fade-in zoom-in duration-500">
        <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome Back!
        </h3>

        <p className="text-gray-500 mb-8">
          You have successfully logged in. Redirecting to dashboard...
        </p>

        <Button variant="outline" onClick={() => window.location.reload()}>
          Log In Again
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {/* EMAIL */}
        <div>
          <Label htmlFor="email" required>
            Email Address
          </Label>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={<Mail className="h-5 w-5" />}
            autoComplete="email"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <Label htmlFor="password" required>
            Password
          </Label>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={<Lock className="h-5 w-5" />}
              autoComplete="current-password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* REMEMBER ME */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 block text-sm text-gray-700">
              Remember me
            </span>
          </label>

          <div className="text-sm">
            <a className="font-medium text-blue-600 hover:text-blue-500" href="#">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Button type="submit" fullWidth isLoading={isSubmitting} className="h-11 text-base">
          Sign In
        </Button>
      </div>
    </form>
  );
}

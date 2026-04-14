// src/pages/Auth.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Auth({ type = "signup" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirect") || "/";

  const [mode, setMode] = useState(type); // "signup", "login", "forgot"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    university: "",
    graduationYear: "",
    major: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
      university: "",
      graduationYear: "",
      major: "",
    });
  };

  // Handle field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = "";
      let payload = {};

      if (mode === "signup") {
        url = "http://localhost:5000/api/auth/register";
        payload = formData;
      } else if (mode === "login") {
        url = "http://localhost:5000/api/auth/login";
        payload = {
          email: formData.email,
          password: formData.password,
        };
      } else if (mode === "forgot") {
        url = "http://localhost:5000/api/auth/forgot-password";
        payload = {
          email: formData.email,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        };
      }

      const { data } = await axios.post(url, payload);

      if (mode === "login") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful 🎉");
        setTimeout(() => navigate(redirectPath, { replace: true }), 1000);
      } else if (mode === "signup") {
        toast.success("Account created successfully! Please login.");
        setMode("login");
        resetForm();
      } else if (mode === "forgot") {
        toast.success(data.message || "Password reset successfully ✅");
        setMode("login");
        resetForm();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center capitalize">
          {mode === "signup"
            ? "Sign Up"
            : mode === "login"
            ? "Login"
            : "Reset Password"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="text"
                name="university"
                placeholder="University"
                value={formData.university}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                name="graduationYear"
                placeholder="Graduation Year"
                value={formData.graduationYear}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                name="major"
                placeholder="Major"
                value={formData.major}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </>
          )}

          {/* Email Field */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* Password Fields */}
          {mode === "login" && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          )}

          {mode === "signup" && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          )}

          {mode === "forgot" && (
            <>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {mode === "signup"
              ? "Create Account"
              : mode === "login"
              ? "Login"
              : "Reset Password"}
          </button>
        </form>

        {/* Navigation Links */}
        <div className="text-center mt-4 space-y-2">
          {mode === "login" && (
            <>
              <p
                onClick={() => {
                  setMode("forgot");
                  resetForm();
                }}
                className="text-blue-600 text-sm cursor-pointer hover:underline"
              >
                Forgot Password?
              </p>
              <p
                onClick={() => {
                  setMode("signup");
                  resetForm();
                }}
                className="text-gray-600 text-sm cursor-pointer hover:underline"
              >
                Don’t have an account? Sign Up
              </p>
            </>
          )}

          {mode === "signup" && (
            <p
              onClick={() => {
                setMode("login");
                resetForm();
              }}
              className="text-gray-600 text-sm cursor-pointer hover:underline"
            >
              Already have an account? Login
            </p>
          )}

          {mode === "forgot" && (
            <p
              onClick={() => {
                setMode("login");
                resetForm();
              }}
              className="text-gray-600 text-sm cursor-pointer hover:underline"
            >
              Back to Login
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

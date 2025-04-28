"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("");

  const handleLogin = () => {
    if (role) {
      router.push({
        pathname: "/dashboard",
        query: { role },
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="company">Company</option>
          <option value="scad_office">SCAD Office</option>
          <option value="faculty">Faculty</option>
        </select>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

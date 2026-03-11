import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://snapcharge-backend-env.eba-dci8dbp5.eu-north-1.elasticbeanstalk.com");

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/admin-auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem("snapcharge_admin_token", data.token);
        sessionStorage.setItem("snapcharge_admin_email", data.admin.email);

        navigate("/admin");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.log("Admin login error:", error);
      alert("Something went wrong while logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAEBD7] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-[#436056] text-center mb-2">
          Admin Login
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Secure access to SnapCharge admin panel
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-[#ddd] rounded-xl px-4 py-3 pr-16 outline-none focus:border-[#9DC183]"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#436056]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#9DC183] text-white py-3 rounded-xl font-semibold hover:bg-[#436056] transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
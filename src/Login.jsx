import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://snapcharge.onrender.com";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("snapcharge_token", data.token);
      localStorage.setItem("snapcharge_user", JSON.stringify(data.user));
      navigate("/my-orders");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAEBD7] flex items-center justify-center px-4">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-black transition"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold text-[#436056] text-center mb-2">
          Login
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Login to view your orders
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#9DC183] text-white py-3 rounded-xl font-semibold hover:bg-[#436056] transition disabled:opacity-60"
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#436056] font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
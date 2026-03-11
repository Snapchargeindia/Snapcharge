import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://snapcharge-backend-env.eba-dci8dbp5.eu-north-1.elasticbeanstalk.com");

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/my-orders";

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
        alert(
          `${data.message || "Login failed"}${
            data.error ? ` - ${data.error}` : ""
          }`
        );
        return;
      }

      localStorage.setItem("snapcharge_token", data.token);
      localStorage.setItem("snapcharge_user", JSON.stringify(data.user));

      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAEBD7] pt-32 pb-16 px-4 flex items-center justify-center">
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
          Login to continue
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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://snapcharge-backend-env.eba-dc8dbp5.eu-north-1.elasticbeanstalk.com");

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      alert("Please enter a valid Indian phone number");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(
          `${data.message || "Signup failed"}${
            data.error ? ` - ${data.error}` : ""
          }`
        );
        return;
      }

      localStorage.setItem("snapcharge_token", data.token);
      localStorage.setItem("snapcharge_user", JSON.stringify(data.user));

      navigate("/my-orders");
    } catch (error) {
      console.log("SIGNUP ERROR:", error);
      alert("Signup failed. Please try again.");
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
          Signup
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Create your account
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[#ddd] rounded-xl px-4 py-3 outline-none focus:border-[#9DC183]"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
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
            {loading ? "Creating account..." : "Signup"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#436056] font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
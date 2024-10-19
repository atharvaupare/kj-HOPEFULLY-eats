import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        const data = await response.json();

        if (response.ok && data.status === "success") {
          if (data.token) {
            localStorage.setItem("authToken", data.token);
          }
          console.log("Registration successful");
          navigate("/homepage");
        } else {
          setErrors({
            submit: data.message || "Registration failed. Please try again.",
          });
        }
      } catch (error) {
        console.error("Registration error:", error);
        setErrors({
          submit: "An error occurred. Please try again.",
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#462b9c] to-[#644ab5]">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <h1 className="mt-3 text-2xl font-semibold text-white capitalize sm:text-3xl">
            Sign Up
          </h1>

          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`block w-full py-3 text-white bg-white/10 border ${
                errors.name ? "border-red-400" : "border-white/20"
              } rounded-lg px-11 placeholder-gray-300 focus:border-white focus:ring-white/50 focus:outline-none focus:ring focus:ring-opacity-40`}
              placeholder="Name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
          )}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`block w-full py-3 text-white bg-white/10 border ${
                errors.email ? "border-red-400" : "border-white/20"
              } rounded-lg px-11 placeholder-gray-300 focus:border-white focus:ring-white/50 focus:outline-none focus:ring focus:ring-opacity-40`}
              placeholder="Email address"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`block w-full px-10 py-3 text-white bg-white/10 border ${
                errors.password ? "border-red-400" : "border-white/20"
              } rounded-lg placeholder-gray-300 focus:border-white focus:ring-white/50 focus:outline-none focus:ring focus:ring-opacity-40`}
              placeholder="Password"
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">{errors.password}</p>
          )}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`block w-full px-10 py-3 text-white bg-white/10 border ${
                errors.confirmPassword ? "border-red-400" : "border-white/20"
              } rounded-lg placeholder-gray-300 focus:border-white focus:ring-white/50 focus:outline-none focus:ring focus:ring-opacity-40`}
              placeholder="Confirm Password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-400">
              {errors.confirmPassword}
            </p>
          )}

          {errors.submit && (
            <p className="mt-4 text-sm text-center text-red-400">
              {errors.submit}
            </p>
          )}

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-white/20 rounded-lg hover:bg-white/30 focus:outline-none focus:ring focus:ring-white/50 focus:ring-opacity-50">
              Sign Up
            </button>

            <div className="mt-6 text-center">
              <NavLink to="/login">
                <span className="text-sm text-gray-300 hover:text-white hover:underline">
                  Already have an account?
                </span>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;

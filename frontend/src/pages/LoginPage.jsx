import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok && data.status === "success") {
          localStorage.setItem("authToken", data.token);
          console.log(data.token);  
          console.log("Login successful");
          navigate("/homepage");
        } else {
          setErrors({
            submit: data.message || "Invalid email or password",
          });
        }
      } catch (error) {
        console.error("Login error:", error);
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
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <h1 className="mt-3 text-2xl font-semibold text-white capitalize sm:text-3xl">
            Sign In
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
                errors.email ? "border-red-400" : "border-white/30"
              } rounded-lg px-11 placeholder-gray-300 focus:border-gray-100 focus:ring-white/70 focus:outline-none focus:ring focus:ring-opacity-40`}
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
                errors.password ? "border-red-400" : "border-white/30"
              } rounded-lg placeholder-gray-300 focus:border-gray-100 focus:ring-white/70 focus:outline-none focus:ring focus:ring-opacity-40`}
              placeholder="Password"
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">{errors.password}</p>
          )}

          {errors.submit && (
            <p className="mt-4 text-sm text-center text-red-400">
              {errors.submit}
            </p>
          )}

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-white/20 rounded-lg hover:bg-white/30 focus:outline-none focus:ring focus:ring-gray-100/70 focus:ring-opacity-50">
              Sign in
            </button>

            <p className="mt-4 text-center text-gray-300">or sign in with</p>

            <a
              href="#"
              className="flex items-center justify-center px-6 py-3 mt-4 text-white transition-colors duration-300 transform border border-white/30 rounded-lg hover:bg-[#5a3eb1]"
            >
              <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>

              <span className="mx-2">Sign in with Google</span>
            </a>

            <div className="mt-6 text-center">
              <NavLink to="/register">
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white hover:underline"
                >
                  {"Don't have an account yet? Sign up"}
                </a>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;

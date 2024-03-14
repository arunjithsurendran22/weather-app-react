import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../authorization/api";

function Login() {
  const inputFocus = useRef();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.email || !formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errors.email = "Email is not in valid format";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginToken = (token) => {
    localStorage.setItem("accessTokenUser", token.accessTokenUser);
    localStorage.setItem("refreshTokenUser", token.refreshTokenUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await api.post("/profile/login", formData);
        if (response.data._id) {
          toast.success("Login Successfully");
          handleLoginToken(response.data);
          navigate("/home");
        } else {
          toast.error(response.data.message);
          setFormData({ ...formData, password: "" });
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Login failed. Please try again.");
        }
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-red-500">
      <div className="w-8/12 max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl">
        <div className="mx-auto">
          <h1 className="font-bold text-3xl text-gray-600 text-center my-8">
            LOGIN
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              ref={inputFocus}
              type="email"
              id="email"
              placeholder="Email"
              className={`bg-slate-100 p-3 rounded-xl shadow-lg focus:outline-none ${
                errors.email ? "border-red-500" : "border"
              }`}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
            <input
              type="password"
              id="password"
              placeholder="Password"
              className={`bg-slate-100 p-3 rounded-xl shadow-lg focus:outline-none ${
                errors.password ? "border-red-500" : "border"
              }`}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
            <button
              type="submit"
              className="bg-gray-800 text-cyan-50 p-3 my-6 rounded-xl shadow-inner text-xl font-bold hover:opacity-90"
            >
              LOGIN
            </button>
          </form>
          <span className="my-5 italic text-center">
            Don't have an Account ?
            <Link to="/register" className="text-blue-600 ml-1 font-bold">
              Register
            </Link>
          </span>
          <div className="text-center">
            <Link to="/forgot-password" className="italic text-red-700">
              Forgot password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import api from "../authorization/api";
import { toast } from "react-toastify";

function Register() {
  const inputFocus = useRef();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Validate input fields in real-time
    validateField(e.target.id, e.target.value);
  };

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const validateField = (field, value) => {
    let error = "";
    if (field === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!value.includes("@")) {
        error = "Email must contain @";
      } else {
        error = "";
      }
    } else if (field === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters long";
      } else if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value)
      ) {
        error =
          "Password must contain at least one uppercase letter, one lowercase letter, and one special character (@, $, !, %, *, ?, or &)";
      } else {
        error = "";
      }
    } else if (field === "phone") {
      if (!value) {
        error = "Phone number is required";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Phone number must be 10 digits";
      } else {
        error = "";
      }
    } else if (field === "name") {
      if (!value.trim()) {
        error = "Name is required";
      } else {
        error = "";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await api.post("/profile/register", formData);
        console.log("Registration response:", response.data);
        if (response.data.message === "Registered successfully") {
          toast.success("User registered successfully");
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        // Handle backend validation errors
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          console.log("Registration failed", error);
        }
      }
    }
  };

  const validateForm = () => {
    const nameError = errors.name;
    const emailError = errors.email;
    const passwordError = errors.password;
    const phoneError = errors.phone;
    return (
      nameError === "" &&
      emailError === "" &&
      passwordError === "" &&
      phoneError === ""
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-red-500">
      <div className="w-8/12 max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl">
        <div className="mx-auto">
          <h1 className="font-bold text-3xl text-gray-600 text-center my-8">
            REGISTER USER
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              ref={inputFocus}
              type="text"
              id="name"
              placeholder="Name"
              className={`bg-slate-100 p-3 rounded-xl shadow-lg focus:outline-none ${
                errors.name && "border-red-500"
              }`}
              onChange={handleChange}
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
            <input
              type="text"
              id="phone"
              placeholder="Phone"
              className={`bg-slate-100 p-3 rounded-xl shadow-lg focus:outline-none ${
                errors.phone && "border-red-500"
              }`}
              onChange={handleChange}
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone}</span>
            )}
            <input
              type="email"
              id="email"
              placeholder="Email"
              className={`bg-slate-100 p-3 rounded-xl shadow-lg focus:outline-none ${
                errors.email && "border-red-500"
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
                errors.password && "border-red-500"
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
              REGISTER
            </button>
          </form>
          <div className="text-center">
            <span className="italic">Already have an account?</span>
            <Link to="/login" className="text-blue-800 ml-1 font-bold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

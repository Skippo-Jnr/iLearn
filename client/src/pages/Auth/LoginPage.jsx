import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import {
  ArrowRight,
  BrainCircuit,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { validateForm } from "../../utils/validation";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    // real-time validation
    if (touched[name]) {
      const errors = validateForm(updatedForm);
      setFieldErrors((prev) => ({ ...prev, [name]: errors[name] || "" }));
    }

    if (error) setError("");
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setFocusedField(null);

    // mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // validate blurred field
    const errors = validateForm(formData);
    setFieldErrors((prev) => ({ ...prev, [name]: errors[name] || "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      setFieldErrors(errors);
      setTouched({ email: true, password: true });
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, formData);

      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        toast.success("Logged in successfully");
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        "Unable to connect. Please check your connection.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 ">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px, transparent_1px)] bg-size-[16px_16px] opacity-30" />

      <div className="relative w-full max-w-md px-6">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-10 ">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/25 mb-6">
              <BrainCircuit className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            <h1 className="text-2xl font-medium text-slate-900 tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm">
              Sign in to continue your journey
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor=""
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wide"
              >
                Email
              </label>
              <div className="relative group">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${focusedField === "email" ? "text-emerald-500" : "text-slate-400"}`}
                >
                  <Mail className="w-5 h-5" strokeWidth={2} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={handleBlur}
                  className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                  placeholder="you@example.com"
                />
              </div>
              {fieldErrors.email && (
                <p className="text-xs text-red-500 font-medium pl-1">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor=""
                className="block text-xs font-semibold text-slate-700 uppercase tracking-wide"
              >
                Password
              </label>
              <div className="relative group">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${focusedField === "password" ? "text-emerald-500" : "text-slate-400"}`}
                >
                  <Lock className="w-5 h-5" strokeWidth={2} />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={handleBlur}
                  className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10"
                  placeholder="**********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-xs text-red-500 font-medium pl-1">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 border-red-200 p-3">
                <p className="text-xs text-red-600 font-medium text-center">
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              disabled={loading}
              className="group relative w-full h-12 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-600 active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-emerald-500/25 overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In{" "}
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                      strokeWidth={2.5}
                    />{" "}
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-slate-200/60">
            <p className="text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Subtle footer text */}
        <p className="text-center text-xs text-slate-400 mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

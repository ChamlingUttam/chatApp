import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, MessageCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const validateForm = () => {
  if (!formData.fullname.trim()) {
    toast.error("Full name is required")
    return false
  }

  if (!formData.email.trim()) {
    toast.error("Email is required")
    return false
  }

  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    toast.error("Invalid email format")
    return false
  }

  if (!formData.password) {
    toast.error("Password is required")
    return false
  }

  if (formData.password.length < 8) {
    toast.error("Password must be at least 8 characters")
    return false
  }

  return true
}



  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm()

    if(success === true)
      signup(formData)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8">
        {/* Chat Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-primary-content">
            <MessageCircle size={32} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              className="
    input input-bordered w-full pl-10
    focus:ring-2 focus:ring-primary
    focus:outline-none
  "
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="
    input input-bordered w-full pl-10
    focus:ring-2 focus:ring-primary
    focus:outline-none
  "
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:outline-none"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3.5 text-gray-400"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSigningUp}
          >
            {isSigningUp ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, User } from "lucide-react";

const users = [
  { username: "eduorbix", password: "eduorbix@123" },
  { email: "abhi@123", password: "123" },
  { email: "teacher@example.com", password: "123456" },
  { email: "admin@example.com", password: "123456" },
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };

    if (!username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Check for manovaidya first, then check other users
      const user = users.find(
        (u) => (u.username === username || u.email === username) && u.password === password
      );

      if (user) {
        // Store auth token (in real app, this would be a JWT)
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }
        
        // Redirect to dashboard with animation
        navigate("/dashboard");
      } else {
        setErrors({
          username: "Invalid credentials",
          password: "Invalid credentials"
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
        
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-purple-200">Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-200 block">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-purple-300 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors({ ...errors, username: "" });
                  }}
                  className={`w-full pl-10 pr-3 py-3 bg-white/10 border ${
                    errors.username ? 'border-red-400' : 'border-white/20'
                  } rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all`}
                  placeholder="Enter your username"
                  autoFocus
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:to-pink-500/10 transition-all pointer-events-none"></div>
              </div>
              {errors.username && (
                <p className="text-red-400 text-sm mt-1 animate-shake">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-200 block">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-300 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: "" });
                  }}
                  className={`w-full pl-10 pr-10 py-3 bg-white/10 border ${
                    errors.password ? 'border-red-400' : 'border-white/20'
                  } rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-purple-300 hover:text-purple-400 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-purple-300 hover:text-purple-400 transition-colors" />
                  )}
                </button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:to-pink-500/10 transition-all pointer-events-none"></div>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 animate-shake">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 bg-white/10 border border-white/20 rounded focus:ring-purple-400 focus:ring-2 text-purple-500 transition-all cursor-pointer"
                />
                <span className="text-sm text-purple-200 group-hover:text-white transition-colors">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-purple-200 hover:text-white transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </div>
              )}
            </button>

            {/* Quick Login Hints */}
            <div className="mt-4 space-y-2">
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <p className="text-xs text-purple-300 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Quick Login:
                </p>
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300">Main Account:</span>
                    <code className="bg-purple-900/50 px-2 py-0.5 rounded text-white font-mono">manovaidya</code>
                    <code className="bg-pink-900/50 px-2 py-0.5 rounded text-white font-mono">manovaidya@123</code>
                  </div>
                  <div className="flex justify-between items-center text-purple-400/70">
                    <span className="text-purple-300">Demo Accounts:</span>
                    <span className="text-xs text-purple-300">(email/pass)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    <div className="flex flex-col">
                      <span className="text-purple-300">admin@example.com</span>
                      <span className="text-purple-300">teacher@example.com</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-purple-300">••••••</span>
                      <span className="text-purple-300">••••••</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-purple-300">
            Don't have an account?{' '}
            <a href="#" className="text-white hover:underline font-medium">
              Contact Admin
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 15s infinite ease-in-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;
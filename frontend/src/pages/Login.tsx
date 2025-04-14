import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../config";
import { setAuthData, checkAuthStatus } from "../utils/authUtils";
import { login } from "../api/endpoints";

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await checkAuthStatus();
        if (user) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { access_token, refresh_token, user } = response.data;
      setAuthData(access_token, refresh_token, user);
      onLogin();
      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Invalid email or password");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-xl font-semibold font-halyard">Checking authentication status...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      {/* Left Panel - Orange Image */}
      <div className="w-1/2 flex items-center justify-center" style={{ backgroundColor: "#F7671F" }}>
        <img
          src="/orange.png"
          alt="Login Visual"
          className="w-[416px] h-[611px] object-contain"
        />
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-16 relative">
        {/* Logo top-left */}
        <img
          src="/logowtext.png"
          alt="Logo"
          className="absolute top-8 left-8 w-[200px] h-[35px] object-contain"
        />

        {/* Centered Form */}
        <div className="mx-auto w-[310px] mt-[5vh]">
          <h1 className="text-[28px] font-semibold font-halyard text-gray-900 leading-none mb-[30px]">
            Welcome back!
          </h1>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700 rounded">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            
            
            <div className="relative border border-[#B3B3B1] focus-within:border-[#F7671F] transition-colors duration-200 rounded-[5px] h-[46px]">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full h-full px-3 text-sm font-halyard focus:outline-none bg-white rounded-[5px]"
                required
              />
              <label
                htmlFor="email"
                className="absolute -top-2.5 left-2 px-1 bg-white text-[12px] font-normal font-halyard text-[#5A5D61] peer-focus:text-[#F7671F] transition-colors duration-200 z-10 pointer-events-none"
              >
                Email
              </label>
            </div>



            {/* Password */}
            <div className="relative border border-[#B3B3B1] focus-within:border-[#F7671F] transition-colors duration-200 rounded-[5px] h-[46px] mb-[30px]">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full h-full px-3 text-sm font-halyard focus:outline-none bg-white rounded-[5px]"
                required
              />
              <label
                htmlFor="password"
                className="absolute -top-2.5 left-2 px-1 bg-white text-[12px] font-normal font-halyard text-[#5A5D61] peer-focus:text-[#F7671F] transition-colors duration-200 z-10 pointer-events-none"
              >
                Password
              </label>
            </div>


            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full h-[46px] bg-[#F7671F] text-white font-semibold rounded-[5px] hover:bg-orange-600 transitio mb-0"
            >
              Sign In
            </button>

            <div className="mt-4 text-[16px] font-halyard text-left">
              <span className="text-[#7A7A78]">Don't have an account? </span>
              <Link
                to="/register"
                className="text-[#F7671F] font-semibold hover:underline hover:text-[#F7671F] !text-[#F7671F] !hover:text-[#F7671F]"
              >
                Sign Up
              </Link>
            </div>

            {/* OR Divider */}
            <div className="flex items-center justify-center my-6 text-sm font-halyard text-[#7A7A78]">
              <div className="flex-grow h-px bg-[#B3B3B1]" />
              <span className="px-4 relative top-[-1px]">or sign in with</span>
              <div className="flex-grow h-px bg-[#B3B3B1]" />
            </div>

            {/* Social Buttons */}
            <div className="flex justify-between gap-4">
              <button className="w-[90px] h-[46px] rounded-[5px] border border-[#B3B3B1] flex items-center justify-center">
                <img src="/google.png" alt="Google" className="h-5 w-5" />
              </button>
              <button className="w-[90px] h-[46px] rounded-[5px] border border-[#B3B3B1] flex items-center justify-center">
                <img src="/facebook.png" alt="Facebook" className="h-5 w-5" />
              </button>
              <button className="w-[90px] h-[46px] rounded-[5px] border border-[#B3B3B1] flex items-center justify-center">
                <img src="/apple.png" alt="Apple" className="h-5 w-5" />
              </button>
            </div>

          </form>
        </div>

        {/* Bottom-left "Don't have an account?" */}
        <div className="absolute bottom-6 left-8 text-[16px] font-halyard">
          <span className="text-[#7A7A78]">Don't have an account? </span>
          <Link to="/register" className="text-[#F7671F] font-semibold hover:underline hover:text-[#F7671F] !text-[#F7671F] !hover:text-[#F7671F]">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

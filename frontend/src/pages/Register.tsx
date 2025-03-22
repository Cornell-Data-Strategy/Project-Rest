import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/endpoints";
import axios from "axios";
import { API_URL } from "../../config";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [gMapsLink, setGMapsLink] = useState("");
  const [tripAdvisorLink, setTripAdvisorLink] = useState("");
  const [yelpLink, setYelpLink] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await register({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        business: {
          name: businessName,
          url: gMapsLink || tripAdvisorLink || yelpLink, // Prioritize gMapsLink, then tripAdvisorLink, then yelpLink
          location: businessAddress,
          business_type: "restaurant", // Assuming a default type, adjust as needed
        },
      });
      navigate("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.error || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left Panel */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-16 relative">
        {/* Logo top-left */}
        <img
          src="/logowtext.png"
          alt="Logo"
          className="absolute top-8 left-8 w-[200px] h-[35px] object-contain"
        />

        {/* Centered Form */}
        <div className="mx-auto w-[310px] mt-[5vh]">
          <p className="text-[14px] font-[400] font-halyard text-gray-900 mb-0">
            Start your journey
          </p>
          <h1 className="text-[28px] font-semibold text-gray-900 leading-none mt-[2px] mb-[55px] font-halyard text-left">
            Sign Up to Tabletalk
          </h1>


          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700 rounded">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-[10px] mb-4">
              {/* First Name */}
              <div className="relative w-[150px] border border-[#B3B3B1] focus-within:border-[#F7671F] transition-colors duration-200 rounded-[5px] h-[46px]">
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="peer w-full h-full px-3 rounded-[5px] text-sm focus:outline-none bg-white"
                  required
                />
                <label
                  htmlFor="firstName"
                  className="absolute -top-2 left-2 px-1 bg-white text-[12px] font-[400] font-halyard text-[#505050] peer-focus:text-[#F7671F] z-10"
                >
                  First Name *
                </label>

              </div>

              {/* Last Name */}
              <div className="relative w-[150px] border border-[#B3B3B1] focus-within:border-[#F7671F] transition-colors duration-200 rounded-[5px] h-[46px]">
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="peer w-full h-full px-3 rounded-[5px] text-sm focus:outline-none bg-white"
                  required
                />
                <label
                  htmlFor="lastName"
                  className="absolute -top-2 left-2 px-1 bg-white text-[12px] font-[400] font-halyard text-[#505050] peer-focus:text-[#F7671F] z-10"
                >
                  Last Name *
                </label>
                
              </div>
            </div>

            {/* Email */}
            <div className="relative border border-[#B3B3B1] focus-within:border-[#F7671F] transition-colors duration-200 rounded-[5px] h-[46px]">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full h-full px-3 rounded-[5px] focus:outline-none bg-white"
                required
              />
              <label
                htmlFor="email"
                className="absolute -top-2 left-2 px-1 bg-white text-[12px] font-[400] font-halyard text-[#505050] peer-focus:text-[#F7671F] z-10"
              >
                Email *
              </label>
              
            </div>

            {/* Password */}
            <div className="relative border border-[#B3B3B1] focus-within:border-[#F7671F] transition-colors duration-200 rounded-[5px] h-[46px]">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full h-full px-3 rounded-[5px] focus:outline-none bg-white"
                required
              />
              <label
                htmlFor="password"
                className="absolute -top-2 left-2 px-1 bg-white text-[12px] font-[400] font-halyard text-[#505050] peer-focus:text-[#F7671F] z-10"
              >
                Password *
              </label>
              
            </div>

            {/* Business Name */}
            <div className="relative border border-[#B3B3B1] focus-within:border-[#F7671F] transition-colors duration-200 rounded-[5px] h-[46px]">
              <input
                type="text"
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="peer w-full h-full px-3 rounded-[5px] focus:outline-none bg-white"
                required
              />
              <label
                htmlFor="businessName"
                className="absolute -top-2 left-2 px-1 bg-white text-[12px] font-[400] font-halyard text-[#505050] peer-focus:text-[#F7671F] z-10"
              >
                Business Name *
              </label>
              
            </div>

            {/* Business Address */}
            <div className="relative border border-[#B3B3B1] focus-within:border-[#F7671F] transition-colors duration-200 rounded-[5px] h-[46px]">
              <input
                type="text"
                id="businessAddress"
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                className="peer w-full h-full px-3  rounded-[5px] focus:outline-none bg-white"
                required
              />
              <label
                htmlFor="businessAddress"
                className="absolute -top-2 left-2 px-1 bg-white text-[12px] font-[400] font-halyard text-[#505050] peer-focus:text-[#F7671F] z-10"
              >
                Business Address *
              </label>
              <input
                type="text"
                id="businessAddress"
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                className="peer w-full h-full px-3  rounded-[5px] focus:outline-none bg-white"
                required
              />
            </div>

            {/* Google Maps Link */}
            <div className="relative border border-[#B3B3B1] focus-within:border-[#F7671F] transition-colors duration-200 rounded-[5px] h-[46px]">
              <input
                type="text"
                id="gMapsLink"
                value={gMapsLink}
                onChange={(e) => setGMapsLink(e.target.value)}
                className="peer w-full h-full px-3 rounded-[5px] focus:outline-none bg-white"
              />
              <label
                htmlFor="gMapsLink"
                className="absolute -top-2 left-2 px-1 bg-white text-[12px] font-[400] font-halyard text-[#505050] peer-focus:text-[#F7671F] z-10"
              >
                Google Maps Link
              </label>
              
            </div>

            {/* TripAdvisor Link */}
            <div className="relative border border-[#B3B3B1] focus-within:border-[#F7671F] transition-colors duration-200 rounded-[5px] h-[46px]">
              <input
                type="text"
                id="tripAdvisorLink"
                value={tripAdvisorLink}
                onChange={(e) => setTripAdvisorLink(e.target.value)}
                className="peer w-full h-full px-3  rounded-[5px] focus:outline-none bg-white"
              />
              <label
                htmlFor="tripAdvisorLink"
                className="absolute -top-2 left-2 px-1 bg-white text-[12px] font-[400] font-halyard text-[#505050] peer-focus:text-[#F7671F] z-10"
              >
                TripAdvisor Link
              </label>
              
            </div>

            {/* Yelp Link */}
            <div className="relative border border-[#B3B3B1] focus-within:border-[#F7671F] transition-colors duration-200 rounded-[5px] h-[46px]">
              <input
                type="text"
                id="yelpLink"
                value={yelpLink}
                onChange={(e) => setYelpLink(e.target.value)}
                className="peer w-full h-full px-3  rounded-[5px] focus:outline-none bg-white"
              />
              <label
                htmlFor="yelpLink"
                className="absolute -top-2 left-2 px-1 bg-white text-[12px] font-[400] font-halyard text-[#505050] peer-focus:text-[#F7671F] z-10"
              >
                Yelp Link
              </label>
              
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[46px] bg-[#F7671F] text-white text-[15px] font-[450] rounded-[5px] hover:bg-orange-600 transition"
            >
              Sign Up
            </button>
          </form>

        </div>
        <div className="absolute bottom-6 left-8 text-[16px] font-halyard">
          <span className="text-[#7A7A78]">Have an account? </span>
          <a href="/login" className="text-[#F7671F] font-semibold hover:underline hover:text-[#F7671F] !text-[#F7671F] !hover:text-[#F7671F]">
            Sign In
          </a>
        </div>
      </div>

      {/* Right Panel */}
      <div
        className="w-1/2 flex items-center justify-center"
        style={{ backgroundColor: "#F7671F" }}
      >
        <img
          src="/orange.png"
          alt="Register Visual"
          className="w-[416px] h-[611px] object-contain"
        />
      </div>
    </div>
  );
}

export default Register;

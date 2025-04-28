import { useNavigate, Link } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F7]">
      {/* Navigation */}
      <nav className="w-full py-4 px-8 flex items-center justify-between">
        <img
          src="/logowtext.png"
          alt="Logo"
          className="w-[200px] h-[35px] object-contain"
        />
        <div className="flex items-center space-x-6">
          <Link to="#features" className="text-[#5A5D61] font-halyard hover:text-[#F7671F]">
            Features
          </Link>
          <Link to="#about" className="text-[#5A5D61] font-halyard hover:text-[#F7671F]">
            About
          </Link>
          <Link to="#pricing" className="text-[#5A5D61] font-halyard hover:text-[#F7671F]">
            Pricing
          </Link>
          <button
            onClick={handleLoginClick}
            className="px-6 py-2 bg-[#F7671F] text-white font-semibold rounded-[5px] hover:bg-orange-600 transition"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex">
        {/* Left Content */}
        <div className="w-1/2 flex flex-col justify-center px-16">
          <h1 className="text-5xl font-bold font-halyard text-gray-900 leading-tight mb-6">
            Welcome to Our <span className="text-[#F7671F]">Platform</span>
          </h1>
          <p className="text-xl text-[#5A5D61] font-halyard mb-8 max-w-md">
            Experience the most intuitive and powerful solution for your needs. Join thousands of satisfied users today.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleLoginClick}
              className="px-8 py-3 bg-[#F7671F] text-white font-semibold rounded-[5px] hover:bg-orange-600 transition"
            >
              Get Started
            </button>
            <button
              onClick={handleRegisterClick}
              className="px-8 py-3 border border-[#B3B3B1] text-[#5A5D61] font-semibold rounded-[5px] hover:border-[#F7671F] hover:text-[#F7671F] transition"
            >
              Sign Up
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12">
            <p className="text-sm text-[#7A7A78] mb-4 font-halyard">Trusted by leading companies</p>
            <div className="flex space-x-8 opacity-70">
              {/* Replace with actual company logos */}
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
              <div className="w-16 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Right Image */}
        <div className="w-1/2 flex items-center justify-center" style={{ backgroundColor: "#F7671F" }}>
          <img
            src="/orange.png"
            alt="Hero Visual"
            className="w-[416px] h-[611px] object-contain"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 px-8 border-t border-[#B3B3B1]">
        <div className="flex justify-between items-center">
          <p className="text-sm text-[#7A7A78] font-halyard">
            © 2025 Your Company. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-sm text-[#7A7A78] font-halyard hover:text-[#F7671F]">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-[#7A7A78] font-halyard hover:text-[#F7671F]">
              Privacy
            </Link>
            <Link to="/contact" className="text-sm text-[#7A7A78] font-halyard hover:text-[#F7671F]">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
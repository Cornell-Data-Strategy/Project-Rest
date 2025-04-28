import React from 'react';
import { Link } from "react-router-dom";

interface NavbarProps {
  isScrolled: boolean;
  handleLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, handleLoginClick }) => {
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-white shadow-md' : 'py-4 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <img
            src="/logowtext.png"
            alt="Logo"
            className={`transition-all duration-300 ${isScrolled ? 'w-[120px] h-[25px]' : 'w-[150px] h-[35px]'} object-contain`}
          />
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#analytics" className="text-[#5A5D61] font-medium hover:text-[#F7671F]">
              Analytics
            </Link>
            <Link to="#insights" className="text-[#5A5D61] font-medium hover:text-[#F7671F]">
              AI Insights
            </Link>
            <Link to="#tagging" className="text-[#5A5D61] font-medium hover:text-[#F7671F]">
              Smart Tagging
            </Link>
            <Link to="#trends" className="text-[#5A5D61] font-medium hover:text-[#F7671F]">
              Trends
            </Link>
            <button
              onClick={handleLoginClick}
              className={`px-6 py-2 bg-[#F7671F] text-white font-semibold rounded-[5px] hover:bg-orange-600 transition transform hover:scale-105`}
            >
              Sign In
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={handleLoginClick}
              className="px-4 py-2 bg-[#F7671F] text-white font-semibold rounded-[5px] hover:bg-orange-600 transition text-sm mr-2"
            >
              Sign In
            </button>
            <button className="text-[#5A5D61]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
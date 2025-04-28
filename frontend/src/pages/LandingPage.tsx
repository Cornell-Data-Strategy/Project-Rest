import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Component Imports
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AnalyticsSection from './components/AnalyticsSection';
import AIInsightsSection from './components/AIInsightsSection';
import SmartTaggingSection from './components/SmartTaggingSection';
import TopicTrendsSection from './components/TopicTrendsSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function Landing() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for floating header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F7]">
      {/* Floating Navigation */}
      <Navbar 
        isScrolled={isScrolled} 
        handleLoginClick={handleLoginClick} 
        handleRegisterClick={handleRegisterClick} 
      />

      {/* Hero Section */}
      <HeroSection 
        handleLoginClick={handleLoginClick} 
        handleRegisterClick={handleRegisterClick} 
      />
        
      {/* Analytics Section */}
      <AnalyticsSection handleRegisterClick={handleRegisterClick} />

      {/* AI Insights Section */}
      <AIInsightsSection handleRegisterClick={handleRegisterClick} />

      {/* Smart Tagging Section */}
      <SmartTaggingSection handleRegisterClick={handleRegisterClick} />

      {/* Topic Trends Section */}
      <TopicTrendsSection handleRegisterClick={handleRegisterClick} />
        
      {/* Pricing Section */}
      <PricingSection handleRegisterClick={handleRegisterClick} />
        
      {/* Testimonials */}
      <TestimonialsSection handleRegisterClick={handleRegisterClick} />
        
      {/* Call to Action */}
      <CallToAction 
        handleLoginClick={handleLoginClick} 
        handleRegisterClick={handleRegisterClick} 
      />

      {/* Footer */}
      <Footer />
      
      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className="fixed right-5 bottom-5 bg-[#F7671F] text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
      
      {/* Styles */}
      <style jsx>{`
        .perspective-dashboard {
          perspective: 1000px;
        }
        
        .rotate-y-5 {
          transform: rotateY(5deg);
        }
        
        .rotate-x-10 {
          transform: rotateX(10deg);
        }
        
        .animated-tag {
          animation: fadeIn 0.5s ease-out;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float 3s ease-in-out 1s infinite;
        }
        
        .animate-float-delay-2 {
          animation: float 3s ease-in-out 2s infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}

export default Landing;
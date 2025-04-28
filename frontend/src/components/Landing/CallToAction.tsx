interface CallToActionProps {
  handleLoginClick: () => void;
  handleRegisterClick: () => void;
}

function CallToAction({ handleLoginClick, handleRegisterClick }: CallToActionProps) {
  return (
    <div className="bg-[#F7671F] text-white py-15 px-4 md:px-8 text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <svg className="absolute right-0 top-0 h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" preserveAspectRatio="none">
          <path fill="rgba(255, 255, 255, 0.05)" d="M0,0 L32,0 L16,32 z"></path>
        </svg>
        <svg className="absolute left-0 bottom-0 h-full transform rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" preserveAspectRatio="none">
          <path fill="rgba(255, 255, 255, 0.05)" d="M0,0 L32,0 L16,32 z"></path>
        </svg>
              <div className="absolute inset-0 z-0">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="10" style={{ stroke: 'black', strokeWidth: 1, strokeOpacity: 0.2 }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
        </svg>
      </div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-2xl md:text-5xl font-semibold mb-6">Ready to Transform Your Restaurant Reviews?</h2>
        <p className="text-xl md:text-2xl mb-10 opacity-90">
          Join hundreds of restaurant owners who are making smarter business decisions with our platform.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={handleRegisterClick}
            className="px-8 py-4 bg-white text-[#F7671F] font-bold rounded-[5px] hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
          >
            Start Your Free Trial
          </button>
          <button
            onClick={handleLoginClick}
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-[5px] hover:bg-white hover:text-[#F7671F] transition"
          >
            Schedule a Demo
          </button>
        </div>
        <p className="mt-6 text-sm opacity-80">
          No credit card required. 14-day free trial. Cancel anytime.
        </p>
      </div>
    </div>
  );
}

export default CallToAction;
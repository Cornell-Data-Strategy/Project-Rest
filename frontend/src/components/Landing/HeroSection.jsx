function HeroSection({ handleLoginClick, handleRegisterClick }) {
  return (
    <div className="relative pt-16 md:pt-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-[#F7671F] opacity-5 rounded-full transform rotate-45"></div>
        <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-[#F7671F] opacity-5 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="w-full md:w-1/2 pr-0 md:pr-12 mb-12 md:mb-0">
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
                Google Reviews <span className="text-[#F7671F] relative">
                  Supercharged 
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 138 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.26916C27.5 1.26916 95 -0.730835 137 6.26916" stroke="#F7671F" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                <br/>for Restaurant Owners
              </h1>
              
              <p className="text-lg md:text-xl text-[#5A5D61] mb-8 max-w-lg">
                Transform scattered Google reviews into actionable insights. Our AI-powered platform helps restaurant owners understand customer feedback and make data-driven decisions.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
                <button
                  onClick={handleLoginClick}
                  className="px-8 py-4 bg-[#F7671F] text-white font-semibold rounded-[5px] hover:bg-orange-600 transition transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                >
                  <span>Get Started</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="px-8 py-4 border-2 border-[#5A5D61] text-[#5A5D61] font-semibold rounded-[5px] hover:border-[#F7671F] hover:text-[#F7671F] transition transform hover:scale-105"
                >
                  Sign Up Free
                </button>
              </div>
              
              {/* Stats with motion suggested styles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="transform hover:-translate-y-2 transition-transform duration-300">
                  <p className="text-4xl font-bold text-[#F7671F] mb-1 flex items-baseline">
                    100+
                    <span className="text-sm text-black ml-1">reviews</span>
                  </p>
                  <p className="text-[#5A5D61]">Analyzed in seconds</p>
                </div>
                
                <div className="transform hover:-translate-y-2 transition-transform duration-300">
                  <p className="text-4xl font-bold text-[#F7671F] mb-1 flex items-baseline">
                    Top 3
                    <span className="text-sm text-black ml-1">priorities</span>
                  </p>
                  <p className="text-[#5A5D61]">Identified automatically</p>
                </div>
                
                <div className="transform hover:-translate-y-2 transition-transform duration-300">
                  <p className="text-4xl font-bold text-[#F7671F] mb-1 flex items-baseline">
                    4x
                    <span className="text-sm text-black ml-1">faster</span>
                  </p>
                  <p className="text-[#5A5D61]">Trend detection</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Floating UI Card */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#F7671F] opacity-10 rounded-full"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-black opacity-5 rounded-full"></div>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md transform hover:scale-[1.01] transition-transform duration-300 z-10 relative">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Review Summary</h3>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-[#F7671F]">4.8</span>
                      <div className="flex ml-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <span className="w-16 text-gray-600">Food</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                      <span className="ml-2 font-medium">4.6</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-16 text-gray-600">Service</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "96%" }}></div>
                      </div>
                      <span className="ml-2 font-medium">4.8</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-16 text-gray-600">Ambience</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                      <span className="ml-2 font-medium">4.5</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-[#F7671F] mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
                      </svg>
                      AI Insight
                    </h4>
                    <p className="text-sm text-gray-700">
                      Customers consistently praise your seafood dishes and attentive waitstaff. Recent improvements in ambience have been noticed. Consider addressing weekend wait times mentioned in 12% of recent reviews.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Great Service (45)</span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Delicious Food (37)</span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">Cozy Atmosphere (28)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
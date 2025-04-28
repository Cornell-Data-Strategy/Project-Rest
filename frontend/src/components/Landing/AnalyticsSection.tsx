function AnalyticsSection({ handleRegisterClick }) {
  return (
    <div id="analytics" className="w-full py-24 relative bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#FBF9F7] to-white"></div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0">
        <svg width="406" height="286" viewBox="0 0 406 286" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.05">
            <circle cx="375" cy="255" r="200" fill="#F7671F"/>
            <circle cx="31" cy="31" r="31" fill="#F7671F"/>
          </g>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Visual Analytics Dashboard</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Bring all your Google reviews into one powerful visual interface. Monitor performance, spot trends, and identify opportunities.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-3/5 mb-10 lg:mb-0 order-2 lg:order-1">
            {/* Mock Dashboard - Simplified with placeholder image */}
            <div className="relative perspective-dashboard">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl transform rotate-y-5 rotate-x-10 scale-[0.85] md:scale-100">
                <div className="bg-gray-800 h-14 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 bg-gray-700 rounded-md text-xs text-gray-300">Restaurant Reviews Dashboard</div>
                  </div>
                </div>
                
                {/* Placeholder Dashboard Image */}
                <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800">
                  <img
                    src="/api/placeholder/600/400"
                    alt="Analytics Dashboard"
                    className="w-full rounded-lg border border-gray-800"
                  />
                </div>
              </div>
              
              {/* Shadow */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-4/5 h-10 bg-black opacity-10 blur-md rounded-full"></div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/5 lg:pl-16 order-1 lg:order-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive Analytics Dashboard</h3>
            <p className="text-lg text-gray-600 mb-6">
              Visualize all your Google reviews in one place with powerful charts and metrics. Track rating trends, review volume, and customer sentiment over time.
            </p>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#F7671F] text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Real-time Monitoring</h4>
                  <p className="mt-2 text-base text-gray-500">
                    Track your reviews as they come in with instant updates and notifications for new feedback.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#F7671F] text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Performance Comparison</h4>
                  <p className="mt-2 text-base text-gray-500">
                    Compare your ratings against competitors or across multiple locations to identify your strengths.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#F7671F] text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Custom Reports</h4>
                  <p className="mt-2 text-base text-gray-500">
                    Generate detailed reports for any time period with just a few clicks and export them for team sharing.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <button onClick={handleRegisterClick} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#F7671F] hover:bg-orange-600 transition transform hover:scale-105">
                Get Started with Analytics
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsSection;
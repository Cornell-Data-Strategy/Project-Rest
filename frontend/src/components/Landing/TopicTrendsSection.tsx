import React from 'react';

interface TopicTrendsSectionProps {
  handleRegisterClick: () => void;
}

const TopicTrendsSection: React.FC<TopicTrendsSectionProps> = ({ handleRegisterClick }) => {
  return (
    <div id="trends" className="w-full py-24 bg-white relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(to right, #e5e7eb 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Topic & Trend Analysis</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Discover what your customers are talking about and how their interests evolve over time.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row-reverse items-center">
          <div className="w-full lg:w-1/2 lg:pl-16 mb-12 lg:mb-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Ahead of Customer Trends</h3>
            <p className="text-lg text-gray-600 mb-8">
              Our trend detection system identifies emerging topics in your reviews, helping you spot new opportunities before your competitors.
            </p>
            
            <div className="space-y-8">
              <div className="relative pl-10">
                <span className="absolute left-0 top-0 flex items-center justify-center h-7 w-7 rounded-full bg-[#F7671F] text-white text-sm font-bold">1</span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Identify Popular Menu Items</h4>
                  <p className="mt-2 text-base text-gray-600">
                    Discover which dishes are getting the most attention and praise in your reviews.
                  </p>
                </div>
              </div>
              
              <div className="relative pl-10">
                <span className="absolute left-0 top-0 flex items-center justify-center h-7 w-7 rounded-full bg-[#F7671F] text-white text-sm font-bold">2</span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Track Emerging Topics</h4>
                  <p className="mt-2 text-base text-gray-600">
                    Stay on top of new trends and topics that are starting to appear in your customer feedback.
                  </p>
                </div>
              </div>
              
              <div className="relative pl-10">
                <span className="absolute left-0 top-0 flex items-center justify-center h-7 w-7 rounded-full bg-[#F7671F] text-white text-sm font-bold">3</span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Compare Over Time</h4>
                  <p className="mt-2 text-base text-gray-600">
                    See how customer interests and concerns change with the seasons or after menu updates.
                  </p>
                </div>
              </div>
              
              <div className="relative pl-10">
                <span className="absolute left-0 top-0 flex items-center justify-center h-7 w-7 rounded-full bg-[#F7671F] text-white text-sm font-bold">4</span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Discover Hidden Patterns</h4>
                  <p className="mt-2 text-base text-gray-600">
                    Uncover connections between topics that might not be obvious when reading reviews individually.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <button onClick={handleRegisterClick} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#F7671F] hover:bg-orange-600 transition transform hover:scale-105">
                Start Tracking Trends
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            {/* Topic Trend Visualization - Simplified with a clean card */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Topic Trends Over Time</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs bg-gray-100 rounded-md text-gray-700">30 Days</button>
                    <button className="px-3 py-1 text-xs bg-[#F7671F] text-white rounded-md">90 Days</button>
                    <button className="px-3 py-1 text-xs bg-gray-100 rounded-md text-gray-700">1 Year</button>
                  </div>
                </div>
                
                {/* Word cloud - Simplified */}
                <div className="relative h-32 mb-8 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                  <div className="text-2xl font-bold text-[#F7671F] absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2">Seafood</div>
                  <div className="text-xl font-bold text-[#F7671F] opacity-80 absolute left-2/3 top-1/3 transform -translate-y-1/2 -translate-x-1/2">Service</div>
                  <div className="text-lg font-bold text-[#F7671F] opacity-70 absolute left-1/2 top-2/3 transform -translate-y-1/2 -translate-x-1/2">Ambience</div>
                  <div className="text-base font-bold text-gray-500 opacity-60 absolute left-1/3 top-1/4 transform -translate-y-1/2 -translate-x-1/2">Wine</div>
                  <div className="text-sm font-bold text-gray-400 opacity-50 absolute left-3/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2">Dessert</div>
                </div>
                
                {/* Trend Chart - Simplified with placeholder */}
                <div className="border border-gray-200 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Topic Mention Frequency</h4>
                    <div className="flex space-x-2 text-xs">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-[#F7671F] mr-1"></span>
                        <span className="text-gray-600">Seafood</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                        <span className="text-gray-600">Service</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                        <span className="text-gray-600">Ambience</span>
                      </div>
                    </div>
                  </div>
                  
                  <img
                    src="/api/placeholder/600/200"
                    alt="Trend Chart"
                    className="w-full rounded-lg border border-gray-100"
                  />
                </div>
                
                {/* Key Insights */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Insights</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-[#F7671F] mr-1 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                      <span>Seafood mentions increased by 45% after your new menu launch in June</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-[#F7671F] mr-1 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Recent ambience improvements are consistently mentioned in July reviews</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-[#F7671F] mr-1 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                      <span>Parking concerns appearing in 8% of August reviews</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicTrendsSection;
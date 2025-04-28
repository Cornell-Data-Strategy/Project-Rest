import React from 'react';

interface AISummarySectionProps {
  handleRegisterClick: () => void;
}

const AISummarySection: React.FC<AISummarySectionProps> = ({ handleRegisterClick }) => {
  return (
    <div id="ai-summary" className="w-full py-24 bg-white text-gray-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 order-2 lg:order-1 mb-12 lg:mb-0 lg:pr-16">
            <div className="bg-gray-50 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-[#F7671F] mb-6">Today's AI Insights</h3>
              
              <div className="space-y-6">
                <div className="bg-white border border-blue-100 rounded-lg p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-semibold text-gray-800">Overall Sentiment</h4>
                    <span className="text-blue-600 font-bold text-xl">94% Positive</span>
                  </div>
                  <p className="text-gray-600">
                    Customers are consistently satisfied with their dining experiences.
                  </p>
                </div>
                
                <div className="bg-white border border-green-100 rounded-lg p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-semibold text-gray-800">Top Performing Areas</h4>
                    <span className="text-green-600 font-bold text-xl">Service & Food</span>
                  </div>
                  <p className="text-gray-600">
                    Exceptional performance in staff attentiveness and menu quality.
                  </p>
                </div>
                
                <div className="bg-white border border-yellow-100 rounded-lg p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-semibold text-gray-800">Areas for Improvement</h4>
                    <span className="text-yellow-600 font-bold text-xl">Wait Times</span>
                  </div>
                  <p className="text-gray-600">
                    Focus on reducing wait times during peak dining hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2 mb-12 lg:mb-0 lg:pl-16">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl text-[#F7671F] md:text-4xl font-bold mb-6">AI-Powered Insights</h2>
              <p className="max-w-2xl mx-auto text-gray-700 text-lg mb-8">
                Transform raw customer feedback into actionable intelligence that drives your restaurant's success.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-[#F7671F] text-white mr-4">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Performance Metrics</h4>
                  <p className="text-gray-600">
                    Comprehensive analysis of your restaurant's performance across key metrics.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-[#F7671F] text-white mr-4">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Trend Analysis</h4>
                  <p className="text-gray-600">
                    Uncover emerging trends and customer preferences in real-time.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-[#F7671F] text-white mr-4">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Updates</h4>
                  <p className="text-gray-600">
                    Continuously updated insights based on the latest customer reviews.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <button 
                onClick={handleRegisterClick} 
                className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-[#F7671F] text-base font-medium rounded-md text-[#F7671F] bg-transparent hover:bg-[#F7671F] hover:text-white transition"
              >
                Explore Full Insights
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
};

export default AISummarySection;
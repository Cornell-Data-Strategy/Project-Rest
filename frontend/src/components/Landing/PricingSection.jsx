import React from 'react';

function SimplifiedPricingSection({ handleRegisterClick }) {
  return (
    <div id="pricing" className="w-full py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Choose the plan that's right for your restaurant. All plans include full access to our core features.
          </p>
        </div>
        
        {/* Pricing Cards Container */}
        <div className="text-center mb-8">
          <p className="text-xl text-gray-600 italic">
            [Pricing details will be determined based on market research and competitive analysis]
          </p>
          
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
            <p className="text-lg text-gray-700 mb-4">
              Our pricing structure will include:
            </p>
            <ul className="text-left space-y-2 mb-6 max-w-md mx-auto">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Multiple tier options based on restaurant size</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Scaling options for restaurant groups</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Flexible monthly & annual billing options</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <button onClick={handleRegisterClick} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#F7671F] hover:bg-orange-600 transition transform hover:scale-105">
            Contact Us for Pricing Details
            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <p className="mt-4 text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SimplifiedPricingSection;
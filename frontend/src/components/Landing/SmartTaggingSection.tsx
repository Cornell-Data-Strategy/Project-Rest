import React from 'react';

interface SmartTaggingSectionProps {
  handleRegisterClick: () => void;
}

const SmartTaggingSection: React.FC<SmartTaggingSectionProps> = ({ handleRegisterClick }) => {
  return (
    <div id="tagging" className="w-full py-24 bg-white text-gray-950 overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="10" style={{ stroke: 'white', strokeWidth: 1, strokeOpacity: 0.1 }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl text-[#F7671F] md:text-4xl font-bold mb-6">Smart Review Classification</h2>
          <p className="max-w-2xl mx-auto text-[#F7671F]text-lg opacity-90">
            Every review is automatically tagged and categorized, making it easy to understand exactly what customers are talking about.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-16">
            <h3 className="text-2xl font-bold mb-6">Automatic 3-Tag Classification</h3>
            <p className="text-lg opacity-90 mb-8">
              Our smart system automatically applies the perfect tags to every review, helping you categorize feedback without manual effort.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white text-[#F7671F]">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-semibold">Food, Service, Ambience</h4>
                  <p className="mt-2 text-base opacity-90">
                    Every review is categorized into key restaurant metrics so you can track performance across all aspects of your business.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white text-[#F7671F]">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-semibold">Custom Tags</h4>
                  <p className="mt-2 text-base opacity-90">
                    Create your own custom tags to track specific menu items, special events, or unique aspects of your restaurant.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white text-[#F7671F]">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-semibold">Smart Filtering</h4>
                  <p className="mt-2 text-base opacity-90">
                    Filter reviews by any combination of tags to zero in on exactly what you want to analyze and improve.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <button onClick={handleRegisterClick} className="inline-flex items-center px-6 py-3 border-2 border-black text-base font-medium rounded-md text-black bg-transparent hover:bg-white hover:text-[#F7671F] transition">
                Try Smart Tagging
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            {/* Floating Tags Visualization */}
            <div className="relative mx-auto max-w-md">
              <div className="bg-white rounded-lg p-6 shadow-xl">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Review with Smart Tags</h3>
                </div>
                
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <h4 className="text-sm font-medium text-gray-900">Sarah Johnson</h4>
                      <div className="ml-2 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">
                      My husband and I had a fantastic dinner here last weekend. The grilled octopus was perfectly cooked and the wine selection was excellent. Our server was attentive and made great recommendations. The new lighting creates a wonderful atmosphere!
                    </p>
                  </div>
                </div>
                
                {/* Smart Tags */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-500 w-24">Category:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="animated-tag px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 inline-flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Service
                      </span>
                      <span className="animated-tag delay-100 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 inline-flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Food
                      </span>
                      <span className="animated-tag delay-200 px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 inline-flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Ambience
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-500 w-24">Menu Items:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="animated-tag delay-300 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Grilled Octopus</span>
                      <span className="animated-tag delay-400 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Wine Selection</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-500 w-24">Sentiment:</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="animated-tag delay-500 px-2 py-1 text-xs font-medium rounded-full bg-[#F7671F] bg-opacity-20 text-[#F7671F]">Positive (98%)</span>
                    </div>
                  </div>
                </div>
                
                {/* More Reviews Preview */}
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-900">More reviews like this:</h4>
                    <button className="text-xs text-[#F7671F] font-medium">View All</button>
                  </div>
                  
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                        <span className="ml-2 text-xs text-gray-700">Alex M.</span>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                        <span className="ml-2 text-xs text-gray-700">Morgan T.</span>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <svg key={star} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292z" />
                          </svg>
                        ))}
                        <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating tags around */}
                <div className="absolute -top-8 -left-8 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 animate-float">
                  Friendly Staff
                </div>
                <div className="absolute -top-4 right-10 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 animate-float-delay">
                  Desserts
                </div>
                <div className="absolute top-1/4 -right-10 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 animate-float-delay-2">
                  Weekend Dinner
                </div>
                <div className="absolute top-2/4 -left-16 px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 animate-float">
                  Romantic
                </div>
                <div className="absolute bottom-20 -right-6 px-2 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-800 animate-float-delay">
                  New Menu
                </div>
                <div className="absolute -bottom-4 left-10 px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 animate-float-delay-2">
                  Family Friendly
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartTaggingSection;
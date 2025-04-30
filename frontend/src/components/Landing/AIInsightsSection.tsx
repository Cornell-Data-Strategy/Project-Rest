import React from 'react';

interface AISummarySectionProps {
  handleRegisterClick: () => void;
}

const AISummarySection: React.FC<AISummarySectionProps> = ({ handleRegisterClick }) => {
  return (
    <section id="ai-summary" className="w-full py-24 bg-gradient-to-b from-gray-50 to-white text-gray-950 overflow-hidden relative">
      {/* Abstract geometric background elements */}
      <div className="absolute inset-0 z-0 opacity-50">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7671F" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#F7671F" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path d="M0,200 Q250,0 500,200 T1000,200 L1000,1000 L0,1000 Z" fill="url(#gradient1)" />
          <circle cx="800" cy="150" r="100" fill="#F7671F" fillOpacity="0.05" />
          <circle cx="200" cy="400" r="150" fill="#F7671F" fillOpacity="0.03" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="flex items-center justify-center mb-4">
              <div className="h-1 w-10 bg-[#F7671F] mr-2"></div>
              <span className="text-lg font-medium text-[#F7671F]">INTELLIGENCE LAYER</span>
              <div className="h-1 w-10 bg-[#F7671F] ml-2"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Restaurant Intelligence System</h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Transform feedback into business advantage with our AI-powered review analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Visualized Insights Panel */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {/* Top accent bar */}
              <div className="h-2 w-full bg-[#F7671F]"></div>
              
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="flex-shrink-0 bg-[#F7671F] bg-opacity-10 p-3 rounded-lg">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 3H15M3 9V15M21 9V15M9 21H15M12 12L12 12.01M16 12L16 12.01M8 12L8 12.01M12 16L12 16.01M12 8L12 8.01" stroke="#F7671F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">AI Snapshot Report</h3>
                </div>

                <div className="space-y-8">
                  {/* Sentiment Gauge */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Customer Sentiment</h4>
                      <span className="text-[#F7671F] font-bold text-xl">94% Positive</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F7671F] rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Excellent rating - consistently above industry average for past 30 days
                    </p>
                  </div>

                  {/* Top Keywords */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Most Mentioned Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { text: 'Friendly Staff', size: 'text-base', opacity: 'bg-opacity-20' },
                        { text: 'Excellent Service', size: 'text-lg', opacity: 'bg-opacity-25' },
                        { text: 'Delicious', size: 'text-xl', opacity: 'bg-opacity-30' },
                        { text: 'Atmosphere', size: 'text-base', opacity: 'bg-opacity-20' },
                        { text: 'Fast', size: 'text-sm', opacity: 'bg-opacity-15' },
                        { text: 'Value', size: 'text-base', opacity: 'bg-opacity-20' },
                        { text: 'Wine Selection', size: 'text-lg', opacity: 'bg-opacity-25' },
                        { text: 'Dessert', size: 'text-sm', opacity: 'bg-opacity-15' },
                      ].map((item, index) => (
                        <span 
                          key={index}
                          className={`${item.size} px-3 py-1 rounded-full bg-[#F7671F] ${item.opacity} text-[#F7671F]`}
                        >
                          {item.text}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Performance Categories */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Performance by Category</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-green-600 font-bold text-2xl mb-1">96%</div>
                        <div className="text-sm text-gray-700">Food</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-blue-600 font-bold text-2xl mb-1">97%</div>
                        <div className="text-sm text-gray-700">Service</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-purple-600 font-bold text-2xl mb-1">92%</div>
                        <div className="text-sm text-gray-700">Ambience</div>
                      </div>
                    </div>
                  </div>

                  {/* Improvement Suggestion */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-yellow-800">Suggested Focus Area</h5>
                        <p className="text-sm text-yellow-700 mt-1">
                          Wait times during Friday and Saturday evenings (7-9pm) mentioned in 12% of recent reviews
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Panel */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Turn Data Into Decisions</h3>
            <p className="text-lg text-gray-600 mb-10">
              Our AI doesn't just collect data—it transforms raw feedback into actionable business intelligence that drives immediate improvements.
            </p>

            <div className="space-y-8">
              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Smart Analytics</h4>
                  <p className="text-gray-600">
                    Identify patterns across thousands of reviews to spot opportunities others miss
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Trend Detection</h4>
                  <p className="text-gray-600">
                    Identify emerging customer preferences before they become mainstream
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Natural Language</h4>
                  <p className="text-gray-600">
                    Understand the true context and intent behind every customer comment
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Alerts</h4>
                  <p className="text-gray-600">
                    Get instant notifications about urgent issues requiring immediate attention
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleRegisterClick}
                  className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden text-lg font-medium text-white bg-[#F7671F] rounded-md shadow-md group"
                >
                  <span className="relative">
                    Unlock Business Intelligence
                    <svg className="inline-block ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISummarySection;
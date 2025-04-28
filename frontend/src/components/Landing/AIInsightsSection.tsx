function AIInsightsSection({ handleRegisterClick }) {
  return (
    <div id="insights" className="w-full py-24 bg-black text-white relative overflow-hidden">
      {/* Tech pattern background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(#F7671F 1px, transparent 1px)",
          backgroundSize: "30px 30px"
        }}></div>
      </div>
      
      {/* Animated wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="opacity-10">
          <path fill="#F7671F" fillOpacity="1" d="M0,192L48,186.7C96,181,192,171,288,181.3C384,192,480,224,576,208C672,192,768,128,864,117.3C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center">
          <div className="w-full lg:w-1/2 lg:pl-16 mb-12 lg:mb-0">
            <div className="text-center lg:text-left">
              <h2 className="inline-block text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#F7671F] to-orange-400 text-transparent bg-clip-text">
                AI-Powered Review Insights
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Our artificial intelligence analyzes hundreds of reviews to extract meaningful insights you can act on immediately.
              </p>
              
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute left-0 flex items-center justify-center h-12 w-1 bg-[#F7671F]"></div>
                  <div className="ml-6">
                    <h4 className="text-xl font-semibold text-white">Automatic Summary Generation</h4>
                    <p className="mt-2 text-gray-400">
                      Our AI distills hundreds of customer comments into clear, actionable summaries so you don't have to read every review.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 flex items-center justify-center h-12 w-1 bg-[#F7671F]"></div>
                  <div className="ml-6">
                    <h4 className="text-xl font-semibold text-white">Sentiment Analysis</h4>
                    <p className="mt-2 text-gray-400">
                      Go beyond star ratings to understand the emotional tone behind reviews and track how customer sentiment evolves.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 flex items-center justify-center h-12 w-1 bg-[#F7671F]"></div>
                  <div className="ml-6">
                    <h4 className="text-xl font-semibold text-white">Prioritized Opportunities</h4>
                    <p className="mt-2 text-gray-400">
                      Get AI-ranked suggestions on what to improve first, based on impact and customer sentiment.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <button onClick={handleRegisterClick} className="inline-flex items-center px-6 py-3 border border-[#F7671F] text-base font-medium rounded-md text-[#F7671F] bg-transparent hover:bg-[#F7671F] hover:bg-opacity-10 transition">
                  Try AI Insights
                  <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative mx-auto max-w-md">
              {/* Decorative glow */}
              <div className="absolute inset-0 rounded-2xl bg-[#F7671F] opacity-20 blur-xl transform -rotate-6"></div>
              
              {/* AI Assistant Interface */}
              <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 relative z-10">
                <div className="bg-gray-800 p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-sm">AI Insight Assistant</span>
                  <div></div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800">
                  {/* AI Header */}
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#F7671F] flex items-center justify-center text-white font-bold text-xl">
                      AI
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-medium">ReviewAI Assistant</h4>
                      <p className="text-xs text-gray-400">Analyzing 245 reviews from last 90 days</p>
                    </div>
                  </div>
                  
                  {/* Processing Animation */}
                  <div className="mb-6 flex">
                    <div className="w-10"></div>
                    <div className="ml-3 flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-[#F7671F] animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-[#F7671F] animate-pulse delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-[#F7671F] animate-pulse delay-150"></div>
                    </div>
                  </div>
                  
                  {/* AI Messages */}
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-[#F7671F] flex items-center justify-center text-white font-bold text-xl">
                        AI
                      </div>
                      <div className="ml-3 bg-gray-800 p-3 rounded-lg rounded-tl-none max-w-xs">
                        <p className="text-white text-sm">I've analyzed your restaurant's reviews from the past 3 months. Here are the key insights:</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10"></div>
                      <div className="ml-3 bg-gray-800 p-3 rounded-lg max-w-xs">
                        <p className="text-white text-sm font-medium mb-1">🌟 Strengths</p>
                        <p className="text-gray-300 text-xs">Your seafood dishes, particularly the "grilled octopus" and "sea bass" are mentioned positively in 87% of reviews that discuss food.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10"></div>
                      <div className="ml-3 bg-gray-800 p-3 rounded-lg max-w-xs">
                        <p className="text-white text-sm font-medium mb-1">🔍 Opportunities</p>
                        <p className="text-gray-300 text-xs">Weekend wait times are mentioned in 32 reviews (12%) as an area of frustration. Customers wait an average of 35 minutes on Friday/Saturday evenings.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10"></div>
                      <div className="ml-3 bg-gray-800 p-3 rounded-lg max-w-xs">
                        <p className="text-white text-sm font-medium mb-1">📈 Trends</p>
                        <p className="text-gray-300 text-xs">Your recent improvements to ambience (new lighting and seating) have been noticed and mentioned positively in 24 reviews since the change.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10"></div>
                      <div className="ml-3 bg-gray-800 p-3 rounded-lg max-w-xs">
                        <p className="text-white text-sm font-medium mb-1">⚡ Recommendation</p>
                        <p className="text-gray-300 text-xs">Consider implementing a digital waitlist system to improve weekend wait time experiences. Would you like me to analyze options?</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="relative">
                      <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-full py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#F7671F] focus:border-transparent" placeholder="Ask your AI assistant a question..." />
                      <button className="absolute right-2 top-2 bg-[#F7671F] rounded-full p-1.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                        </svg>
                      </button>
                    </div>
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

export default AIInsightsSection;
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-white shadow-md' : 'py-4 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <img
              src="/logowtext.png"
              alt="Logo"
              className={`transition-all duration-300 ${isScrolled ? 'w-[120px] h-[25px]' : 'w-[150px] h-[35px]'} object-contain`}
            />
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="#analytics" className="text-[#5A5D61] font-medium hover:text-[#F7671F]">
                Analytics
              </Link>
              <Link to="#insights" className="text-[#5A5D61] font-medium hover:text-[#F7671F]">
                AI Insights
              </Link>
              <Link to="#tagging" className="text-[#5A5D61] font-medium hover:text-[#F7671F]">
                Smart Tagging
              </Link>
              <Link to="#trends" className="text-[#5A5D61] font-medium hover:text-[#F7671F]">
                Trends
              </Link>
              <button
                onClick={handleLoginClick}
                className={`px-6 py-2 bg-[#F7671F] text-white font-semibold rounded-[5px] hover:bg-orange-600 transition transform hover:scale-105`}
              >
                Sign In
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={handleLoginClick}
                className="px-4 py-2 bg-[#F7671F] text-white font-semibold rounded-[5px] hover:bg-orange-600 transition text-sm mr-2"
              >
                Sign In
              </button>
              <button className="text-[#5A5D61]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Asymmetrical Design */}
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
        
      {/* Analytics Section - 3D Dashboard Style */}
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
              {/* Mock Dashboard */}
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
                  
                  <div className="p-6 grid grid-cols-6 gap-4 bg-gradient-to-br from-gray-900 to-gray-800">
                    {/* Sidebar */}
                    <div className="col-span-1 bg-gray-800 rounded-lg p-3">
                      <div className="space-y-4">
                        <div className="w-full h-10 bg-[#F7671F] rounded-md"></div>
                        <div className="w-full h-10 bg-gray-700 rounded-md"></div>
                        <div className="w-full h-10 bg-gray-700 rounded-md"></div>
                        <div className="w-full h-10 bg-gray-700 rounded-md"></div>
                        <div className="mt-20 w-full h-40 bg-gray-700 rounded-md opacity-50"></div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="col-span-5 space-y-4">
                      {/* Top cards */}
                      <div className="grid grid-cols-4 gap-4">
                        <div className="bg-gray-800 rounded-lg p-3">
                          <div className="text-xs text-gray-400">Overall Rating</div>
                          <div className="text-2xl font-bold text-white">4.8</div>
                          <div className="mt-2 h-1 bg-gray-700 rounded-full">
                            <div className="h-1 bg-green-500 rounded-full" style={{width: '92%'}}></div>
                          </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3">
                          <div className="text-xs text-gray-400">Reviews</div>
                          <div className="text-2xl font-bold text-white">421</div>
                          <div className="mt-2 h-1 bg-gray-700 rounded-full">
                            <div className="h-1 bg-blue-500 rounded-full" style={{width: '78%'}}></div>
                          </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3">
                          <div className="text-xs text-gray-400">Sentiment</div>
                          <div className="text-2xl font-bold text-white">89%</div>
                          <div className="mt-2 h-1 bg-gray-700 rounded-full">
                            <div className="h-1 bg-[#F7671F] rounded-full" style={{width: '89%'}}></div>
                          </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3">
                          <div className="text-xs text-gray-400">Response Rate</div>
                          <div className="text-2xl font-bold text-white">94%</div>
                          <div className="mt-2 h-1 bg-gray-700 rounded-full">
                            <div className="h-1 bg-purple-500 rounded-full" style={{width: '94%'}}></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Charts */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800 rounded-lg p-4 h-48">
                          <div className="text-xs text-gray-400 mb-2">Review Trend</div>
                          <div className="h-32 flex items-end">
                            <div className="w-1/12 h-[20%] bg-gray-700 mx-px rounded-t"></div>
                            <div className="w-1/12 h-[30%] bg-gray-700 mx-px rounded-t"></div>
                            <div className="w-1/12 h-[25%] bg-gray-700 mx-px rounded-t"></div>
                            <div className="w-1/12 h-[45%] bg-gray-700 mx-px rounded-t"></div>
                            <div className="w-1/12 h-[55%] bg-gray-700 mx-px rounded-t"></div>
                            <div className="w-1/12 h-[40%] bg-gray-700 mx-px rounded-t"></div>
                            <div className="w-1/12 h-[60%] bg-gray-700 mx-px rounded-t"></div>
                            <div className="w-1/12 h-[75%] bg-gray-700 mx-px rounded-t"></div>
                            <div className="w-1/12 h-[90%] bg-[#F7671F] mx-px rounded-t"></div>
                            <div className="w-1/12 h-[85%] bg-[#F7671F] mx-px rounded-t"></div>
                            <div className="w-1/12 h-[95%] bg-[#F7671F] mx-px rounded-t"></div>
                            <div className="w-1/12 h-full bg-[#F7671F] mx-px rounded-t"></div>
                          </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4 h-48">
                          <div className="text-xs text-gray-400 mb-2">Rating Distribution</div>
                          <div className="grid grid-cols-5 gap-2 h-32 pt-4">
                            <div className="flex flex-col justify-end items-center">
                              <div className="h-[15%] w-full bg-red-500 rounded-t"></div>
                              <div className="text-xs text-gray-500 mt-1">1★</div>
                            </div>
                            <div className="flex flex-col justify-end items-center">
                              <div className="h-[10%] w-full bg-orange-500 rounded-t"></div>
                              <div className="text-xs text-gray-500 mt-1">2★</div>
                            </div>
                            <div className="flex flex-col justify-end items-center">
                              <div className="h-[20%] w-full bg-yellow-500 rounded-t"></div>
                              <div className="text-xs text-gray-500 mt-1">3★</div>
                            </div>
                            <div className="flex flex-col justify-end items-center">
                              <div className="h-[55%] w-full bg-green-400 rounded-t"></div>
                              <div className="text-xs text-gray-500 mt-1">4★</div>
                            </div>
                            <div className="flex flex-col justify-end items-center">
                              <div className="h-full w-full bg-green-500 rounded-t"></div>
                              <div className="text-xs text-gray-500 mt-1">5★</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Recent Reviews */}
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="text-xs text-gray-400 mb-2">Recent Reviews</div>
                        <div className="space-y-2">
                          <div className="bg-gray-700 h-10 rounded flex items-center px-2">
                            <div className="w-6 h-6 rounded-full bg-blue-500 mr-2"></div>
                            <div className="flex-1 h-3 bg-gray-600 rounded-full"></div>
                            <div className="flex ml-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div key={star} className="w-3 h-3 mx-px bg-yellow-400 rounded-full"></div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-gray-700 h-10 rounded flex items-center px-2">
                            <div className="w-6 h-6 rounded-full bg-green-500 mr-2"></div>
                            <div className="flex-1 h-3 bg-gray-600 rounded-full"></div>
                            <div className="flex ml-2">
                              {[1, 2, 3, 4].map((star) => (
                                <div key={star} className="w-3 h-3 mx-px bg-yellow-400 rounded-full"></div>
                              ))}
                              <div className="w-3 h-3 mx-px bg-gray-600 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
      
      {/* AI Insights Section - Futuristic/Tech Design */}
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

      {/* Smart Tagging Section - Organic/Flowing Design */}
      <div id="tagging" className="w-full py-24 bg-[#F7671F] text-white overflow-hidden relative">
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
          
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="rgba(255, 255, 255, 0.05)" d="M57.5,-50.8C71.9,-33.7,79.2,-8.9,74.7,13.5C70.2,35.8,53.9,55.7,33.1,65.5C12.3,75.3,-13,75,-34.9,65.1C-56.8,55.2,-75.4,35.6,-79.6,12.8C-83.7,-10,-73.5,-36.1,-56.3,-53.6C-39.1,-71,-19.5,-79.9,2.3,-81.9C24.2,-83.9,48.4,-78.9,57.5,-50.8Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4">
            <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="rgba(255, 255, 255, 0.05)" d="M57.5,-50.8C71.9,-33.7,79.2,-8.9,74.7,13.5C70.2,35.8,53.9,55.7,33.1,65.5C12.3,75.3,-13,75,-34.9,65.1C-56.8,55.2,-75.4,35.6,-79.6,12.8C-83.7,-10,-73.5,-36.1,-56.3,-53.6C-39.1,-71,-19.5,-79.9,2.3,-81.9C24.2,-83.9,48.4,-78.9,57.5,-50.8Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Smart Review Classification</h2>
            <p className="max-w-2xl mx-auto text-lg opacity-90">
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
                <button onClick={handleRegisterClick} className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-[#F7671F] transition">
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
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
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

      {/* Topic Trends Section - Data Visualization Style */}
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
              {/* Topic Trend Visualization */}
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
                  
                  {/* Word cloud */}
                  <div className="relative h-32 mb-8">
                    {/* This would be a word cloud in a real implementation */}
                    <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-2xl font-bold text-[#F7671F]">Seafood</div>
                    <div className="absolute left-2/3 top-1/3 transform -translate-y-1/2 -translate-x-1/2 text-xl font-bold text-[#F7671F] opacity-80">Service</div>
                    <div className="absolute left-1/2 top-2/3 transform -translate-y-1/2 -translate-x-1/2 text-lg font-bold text-[#F7671F] opacity-70">Ambience</div>
                    <div className="absolute left-1/3 top-1/4 transform -translate-y-1/2 -translate-x-1/2 text-base font-bold text-gray-500 opacity-60">Wine</div>
                    <div className="absolute left-3/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-base font-bold text-gray-500 opacity-60">Dessert</div>
                    <div className="absolute left-1/2 top-1/4 transform -translate-y-1/2 -translate-x-1/2 text-sm font-bold text-gray-400 opacity-50">Cocktails</div>
                    <div className="absolute left-1/5 top-2/3 transform -translate-y-1/2 -translate-x-1/2 text-sm font-bold text-gray-400 opacity-50">Waitstaff</div>
                    <div className="absolute left-2/3 top-3/4 transform -translate-y-1/2 -translate-x-1/2 text-xs font-bold text-gray-300 opacity-40">Parking</div>
                    <div className="absolute left-1/3 top-3/4 transform -translate-y-1/2 -translate-x-1/2 text-xs font-bold text-gray-300 opacity-40">Music</div>
                  </div>
                  
                  {/* Trend Chart */}
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
                    
                    <div className="relative h-48">
                      {/* Axes */}
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                      <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200"></div>
                      
                      {/* Grid lines */}
                      <div className="absolute left-0 right-0 top-1/4 h-px bg-gray-100"></div>
                      <div className="absolute left-0 right-0 top-2/4 h-px bg-gray-100"></div>
                      <div className="absolute left-0 right-0 top-3/4 h-px bg-gray-100"></div>
                      
                      {/* Y-axis labels */}
                      <div className="absolute -left-2 top-0 transform -translate-x-full -translate-y-1/2 text-xs text-gray-400">100%</div>
                      <div className="absolute -left-2 top-1/4 transform -translate-x-full -translate-y-1/2 text-xs text-gray-400">75%</div>
                      <div className="absolute -left-2 top-2/4 transform -translate-x-full -translate-y-1/2 text-xs text-gray-400">50%</div>
                      <div className="absolute -left-2 top-3/4 transform -translate-x-full -translate-y-1/2 text-xs text-gray-400">25%</div>
                      <div className="absolute -left-2 bottom-0 transform -translate-x-full -translate-y-1/2 text-xs text-gray-400">0%</div>
                      
                      {/* X-axis labels */}
                      <div className="absolute left-0 bottom-0 transform -translate-y-full -translate-x-1/2 text-xs text-gray-400">Apr</div>
                      <div className="absolute left-1/4 bottom-0 transform -translate-y-full -translate-x-1/2 text-xs text-gray-400">May</div>
                      <div className="absolute left-2/4 bottom-0 transform -translate-y-full -translate-x-1/2 text-xs text-gray-400">Jun</div>
                      <div className="absolute left-3/4 bottom-0 transform -translate-y-full -translate-x-1/2 text-xs text-gray-400">Jul</div>
                      <div className="absolute right-0 bottom-0 transform -translate-y-full -translate-x-1/2 text-xs text-gray-400">Aug</div>
                      
                      {/* Data Lines */}
                      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                        {/* Seafood Line */}
                        <path d="M0,96 L100,78 L200,60 L300,36 L400,24" fill="none" stroke="#F7671F" strokeWidth="2" />
                        <circle cx="0" cy="96" r="4" fill="#F7671F" />
                        <circle cx="100" cy="78" r="4" fill="#F7671F" />
                        <circle cx="200" cy="60" r="4" fill="#F7671F" />
                        <circle cx="300" cy="36" r="4" fill="#F7671F" />
                        <circle cx="400" cy="24" r="4" fill="#F7671F" />
                        
                        {/* Service Line */}
                        <path d="M0,120 L100,110 L200,90 L300,80 L400,60" fill="none" stroke="#3B82F6" strokeWidth="2" />
                        <circle cx="0" cy="120" r="4" fill="#3B82F6" />
                        <circle cx="100" cy="110" r="4" fill="#3B82F6" />
                        <circle cx="200" cy="90" r="4" fill="#3B82F6" />
                        <circle cx="300" cy="80" r="4" fill="#3B82F6" />
                        <circle cx="400" cy="60" r="4" fill="#3B82F6" />
                        
                        {/* Ambience Line */}
                        <path d="M0,140 L100,130 L200,100 L300,70 L400,50" fill="none" stroke="#10B981" strokeWidth="2" />
                        <circle cx="0" cy="140" r="4" fill="#10B981" />
                        <circle cx="100" cy="130" r="4" fill="#10B981" />
                        <circle cx="200" cy="100" r="4" fill="#10B981" />
                        <circle cx="300" cy="70" r="4" fill="#10B981" />
                        <circle cx="400" cy="50" r="4" fill="#10B981" />
                      </svg>
                    </div>
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
        
      {/* Pricing Section */}
      <div id="pricing" className="w-full py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Choose the plan that's right for your restaurant. All plans include full access to our core features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-transform hover:transform hover:scale-105">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Starter</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-gray-900">$49</span>
                  <span className="text-sm text-gray-500 ml-1">/month</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">Perfect for small restaurants just getting started with review management.</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Up to 200 reviews per month</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Basic analytics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Weekly AI insights</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Standard support</span>
                  </li>
                </ul>
                <button onClick={handleRegisterClick} className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-[#F7671F] font-medium rounded-md transition-colors">
                  Get Started
                </button>
              </div>
            </div>
            
            {/* Professional Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[#F7671F] relative transform scale-105">
              <div className="absolute top-0 inset-x-0 h-2 bg-[#F7671F]"></div>
              <div className="absolute -top-5 inset-x-0 flex justify-center">
                <span className="bg-[#F7671F] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Most Popular</span>
              </div>
              <div className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                  <span className="text-sm text-gray-500 ml-1">/month</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">The perfect balance of features and value for established restaurants.</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Up to 1000 reviews per month</span>
                  </li>
                  <li className="flex items-start">                   
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Advanced analytics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Daily AI insights</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Custom tagging system</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Priority support</span>
                  </li>
                </ul>
                <button onClick={handleRegisterClick} className="w-full py-3 px-4 bg-[#F7671F] hover:bg-orange-600 text-white font-medium rounded-md transition-colors">
                  Start Free Trial
                </button>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-transform hover:transform hover:scale-105">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-gray-900">$249</span>
                  <span className="text-sm text-gray-500 ml-1">/month</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">For restaurant groups and high-volume locations with complex needs.</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Unlimited reviews</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Enterprise dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Real-time AI insights</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Multi-location management</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Dedicated account manager</span>
                  </li>
                </ul>
                <button onClick={handleRegisterClick} className="w-full py-3 px-4 bg-gray-800 hover:bg-black text-white font-medium rounded-md transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">All plans include a 14-day free trial. No credit card required.</p>
            <a href="#" className="text-[#F7671F] font-medium hover:underline">View full comparison →</a>
          </div>
        </div>
      </div>
        
      {/* Testimonials */}
      <div id="testimonials" className="w-full py-24 bg-black text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute w-40 h-40 top-10 left-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#F7671F" d="M57.5,-50.8C71.9,-33.7,79.2,-8.9,74.7,13.5C70.2,35.8,53.9,55.7,33.1,65.5C12.3,75.3,-13,75,-34.9,65.1C-56.8,55.2,-75.4,35.6,-79.6,12.8C-83.7,-10,-73.5,-36.1,-56.3,-53.6C-39.1,-71,-19.5,-79.9,2.3,-81.9C24.2,-83.9,48.4,-78.9,57.5,-50.8Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute w-40 h-40 bottom-10 right-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#F7671F" d="M57.5,-50.8C71.9,-33.7,79.2,-8.9,74.7,13.5C70.2,35.8,53.9,55.7,33.1,65.5C12.3,75.3,-13,75,-34.9,65.1C-56.8,55.2,-75.4,35.6,-79.6,12.8C-83.7,-10,-73.5,-36.1,-56.3,-53.6C-39.1,-71,-19.5,-79.9,2.3,-81.9C24.2,-83.9,48.4,-78.9,57.5,-50.8Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Restaurant Owners</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-300">
              Don't take our word for it. See what restaurant owners say about our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 transform transition-transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#F7671F] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Michael Rodriguez</h4>
                  <p className="text-sm text-gray-400">Owner, Seaside Grill</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300">
                "The AI insights saved me countless hours analyzing reviews. We identified a service issue I hadn't noticed and after fixing it, our ratings improved dramatically in just a month."
              </p>
              <div className="mt-4 text-[#F7671F] font-medium text-sm">
                Rating increased from 4.2 to 4.8
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 transform transition-transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#F7671F] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Sarah Chen</h4>
                  <p className="text-sm text-gray-400">Manager, Fusion Bowl</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300">
                "The topic tracking helped us discover that our new dessert menu was a huge hit with customers. We would have missed this insight completely without the smart tagging system."
              </p>
              <div className="mt-4 text-[#F7671F] font-medium text-sm">
                Dessert sales increased by 32%
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 transform transition-transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#F7671F] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">James Wilson</h4>
                  <p className="text-sm text-gray-400">Owner, Urban Table Group</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300">
                "Managing reviews across our four locations used to be a nightmare. Now I can see everything in one dashboard, spot patterns, and make group-wide decisions with confidence."
              </p>
              <div className="mt-4 text-[#F7671F] font-medium text-sm">
                Saved 15+ hours per week
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <button onClick={handleRegisterClick} className="inline-flex items-center px-8 py-3 border-2 border-[#F7671F] text-base font-medium rounded-md text-[#F7671F] bg-transparent hover:bg-[#F7671F] hover:text-white transition transform hover:scale-105">
              Join These Happy Customers
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
        
      {/* Call to Action */}
      <div className="bg-[#F7671F] text-white py-20 px-4 md:px-8 text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0">
          <svg className="absolute right-0 top-0 h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" preserveAspectRatio="none">
            <path fill="rgba(255, 255, 255, 0.05)" d="M0,0 L32,0 L16,32 z"></path>
          </svg>
          <svg className="absolute left-0 bottom-0 h-full transform rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" preserveAspectRatio="none">
            <path fill="rgba(255, 255, 255, 0.05)" d="M0,0 L32,0 L16,32 z"></path>
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Restaurant Reviews?</h2>
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

      {/* Footer */}
      <footer className="w-full py-12 px-4 md:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <img
                src="/logowtext.png"
                alt="Logo"
                className="w-[150px] h-[30px] object-contain mb-4 brightness-200 contrast-200"
              />
              <p className="text-gray-400 text-sm">
                Transforming restaurant reviews into actionable insights with the power of AI.
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#analytics" className="text-gray-400 hover:text-white transition">Analytics</a></li>
                <li><a href="#insights" className="text-gray-400 hover:text-white transition">AI Insights</a></li>
                <li><a href="#tagging" className="text-gray-400 hover:text-white transition">Smart Tagging</a></li>
                <li><a href="#trends" className="text-gray-400 hover:text-white transition">Topic Trends</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2025 ReviewAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className="fixed right-5 bottom-5 bg-[#F7671F] text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
      
      {/* Add this to your CSS */}
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
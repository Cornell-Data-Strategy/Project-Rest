import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Landing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("analytics");

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F7]">
      {/* Navigation */}
      <nav className="w-full py-4 px-8 flex items-center justify-between">
        <img
          src="/logowtext.png"
          alt="Logo"
          className="w-[200px] h-[35px] object-contain"
        />
        <div className="flex items-center space-x-6">
          <Link to="#features" className="text-[#5A5D61] font-halyard hover:text-[#F7671F]">
            Features
          </Link>
          <Link to="#pricing" className="text-[#5A5D61] font-halyard hover:text-[#F7671F]">
            Pricing
          </Link>
          <Link to="#testimonials" className="text-[#5A5D61] font-halyard hover:text-[#F7671F]">
            Testimonials
          </Link>
          <button
            onClick={handleLoginClick}
            className="px-6 py-2 bg-[#F7671F] text-white font-semibold rounded-[5px] hover:bg-orange-600 transition"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col">
        {/* Main Hero */}
        <div className="flex">
          {/* Left Content */}
          <div className="w-1/2 flex flex-col justify-center px-16 py-16">
            <h1 className="text-5xl font-bold font-halyard text-gray-900 leading-tight mb-6">
              Google Reviews <span className="text-[#F7671F]">Supercharged</span> for Restaurant Owners
            </h1>
            <p className="text-xl text-[#5A5D61] font-halyard mb-8 max-w-md">
              Transform scattered Google reviews into actionable insights. Our AI-powered platform helps restaurant owners understand customer feedback and make data-driven decisions.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleLoginClick}
                className="px-8 py-3 bg-[#F7671F] text-white font-semibold rounded-[5px] hover:bg-orange-600 transition"
              >
                Get Started
              </button>
              <button
                onClick={handleRegisterClick}
                className="px-8 py-3 border border-[#B3B3B1] text-[#5A5D61] font-semibold rounded-[5px] hover:border-[#F7671F] hover:text-[#F7671F] transition"
              >
                Sign Up
              </button>
            </div>
            
            {/* Clean Statistics - No Boxes or Icons */}
            <div className="mt-12">
              <p className="text-sm text-[#7A7A78] mb-6 font-halyard">Why restaurant owners choose us</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Statistic 1 */}
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#F7671F] mb-2">100+</p>
                  <p className="text-gray-700">Reviews analyzed in seconds</p>
                </div>

                {/* Statistic 2 */}
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#F7671F] mb-2">Top 3</p>
                  <p className="text-gray-700">Improvement priorities identified</p>
                </div>

                {/* Statistic 3 */}
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#F7671F] mb-2">4x</p>
                  <p className="text-gray-700">Faster trend detection</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="w-1/2 flex items-center justify-center bg-[#F7671F] p-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md">
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
                  <h4 className="font-semibold text-[#F7671F] mb-2">AI Insight</h4>
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
        
        {/* Features Section */}
        <div id="features" className="py-16 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Restaurant Owners</h2>
            
            {/* Feature Tabs */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setActiveTab("analytics")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "analytics" ? "bg-white text-[#F7671F] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Smart Analytics
                </button>
                <button 
                  onClick={() => setActiveTab("ai")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "ai" ? "bg-white text-[#F7671F] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  AI Insights
                </button>
                <button 
                  onClick={() => setActiveTab("tags")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "tags" ? "bg-white text-[#F7671F] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Smart Tagging
                </button>
                <button 
                  onClick={() => setActiveTab("trends")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "trends" ? "bg-white text-[#F7671F] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Topic Trends
                </button>
              </div>
            </div>
            
            {/* Feature Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Feature Description */}
              <div>
                {activeTab === "analytics" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Comprehensive Analytics Dashboard</h3>
                    <p className="text-gray-600 mb-6">
                      Visualize all your Google reviews in one place with powerful charts and metrics. Track rating trends, review volume, and customer sentiment over time.
                    </p>
                    <ul className="space-y-3">
                      {["Real-time review monitoring", "Rating breakdown by category", "Sentiment analysis over time", "Performance comparison with competitors"].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {activeTab === "ai" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">AI-Powered Review Insights</h3>
                    <p className="text-gray-600 mb-6">
                      Let our AI do the heavy lifting by summarizing hundreds of reviews and highlighting actionable insights you might have missed.
                    </p>
                    <ul className="space-y-3">
                      {["Automatic summary of all review feedback", "Recurring themes and suggestions", "Prioritized improvement opportunities", "Real-time alerts for negative feedback"].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {activeTab === "tags" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Smart Review Classification</h3>
                    <p className="text-gray-600 mb-6">
                      Every review is automatically tagged with 3 classification labels, making it easy to understand exactly what customers are talking about.
                    </p>
                    <ul className="space-y-3">
                      {["Automatic 3-tag classification system", "Food, service, ambience categorization", "Custom tag creation for your unique needs", "Filter reviews by specific attributes"].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {activeTab === "trends" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Topic & Trend Analysis</h3>
                    <p className="text-gray-600 mb-6">
                      Identify what topics are being talked about most frequently and track how customer interests evolve over time.
                    </p>
                    <ul className="space-y-3">
                      {["Identify most discussed menu items", "Track emerging topics and concerns", "Compare topic popularity over time", "Discover hidden patterns in feedback"].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Feature Image */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                {activeTab === "analytics" && (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Analytics Dashboard Preview</span>
                    </div>
                  </div>
                )}
                
                {activeTab === "ai" && (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500 text-sm">AI Insights Preview</span>
                    </div>
                  </div>
                )}
                
                {activeTab === "tags" && (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Smart Tagging Preview</span>
                    </div>
                  </div>
                )}
                
                {activeTab === "trends" && (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Topic Trends Preview</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-[#F7671F] text-white py-16 px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Restaurant Reviews?</h2>
            <p className="text-xl mb-8">Join hundreds of restaurant owners who are making smarter business decisions with our platform.</p>
            <button 
              onClick={handleRegisterClick}
              className="px-8 py-3 bg-white text-[#F7671F] font-semibold rounded-[5px] hover:bg-gray-100 transition"
            >
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 px-8 border-t border-[#B3B3B1] bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <img
              src="/logowtext.png"
              alt="Logo"
              className="w-[150px] h-[30px] object-contain mb-4 md:mb-0"
            />
            <div className="flex space-x-6">
              <Link to="/terms" className="text-sm text-[#7A7A78] font-halyard hover:text-[#F7671F]">
                Terms
              </Link>
              <Link to="/privacy" className="text-sm text-[#7A7A78] font-halyard hover:text-[#F7671F]">
                Privacy
              </Link>
              <Link to="/contact" className="text-sm text-[#7A7A78] font-halyard hover:text-[#F7671F]">
                Contact
              </Link>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-[#7A7A78] font-halyard">
              © 2025 ReviewAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
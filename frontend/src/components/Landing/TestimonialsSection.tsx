import React from 'react';

interface TestimonialsSectionProps {
  handleRegisterClick: () => void;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ handleRegisterClick }) => {
  return (
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
  );
};

export default TestimonialsSection;
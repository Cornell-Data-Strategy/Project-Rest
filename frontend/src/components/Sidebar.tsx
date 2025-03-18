import { useLocation } from 'react-router-dom';
import { HomeIcon, DocumentTextIcon, LockClosedIcon } from '@heroicons/react/24/solid';

function Sidebar() {
    const location = useLocation();
    
    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="w-20 h-screen bg-gray-800 shadow-lg flex-shrink-0 flex flex-col items-center">
            <div className="w-full py-5 flex justify-center border-b border-gray-700">
                <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">PR</span>
                </div>
            </div>
            
            <nav className="flex flex-col items-center pt-8 space-y-8 w-full">
                {/* Dashboard Icon */}
                <a 
                    href="/dashboard" 
                    className={`flex justify-center items-center w-12 h-12 rounded-lg transition-all ${
                        isActive('/dashboard') 
                            ? 'bg-blue-500 text-white' 
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                    <HomeIcon className="h-6 w-6 text-white" />
                </a>

                {/* Reviews Icon */}
                <a 
                    href="/reviews" 
                    className={`flex justify-center items-center w-12 h-12 rounded-lg transition-all ${
                        isActive('/reviews') 
                            ? 'bg-blue-500 text-white' 
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                    <DocumentTextIcon className="h-6 w-6 text-white" />
                </a>

                {/* Login Icon */}
                <a 
                    href="/login" 
                    className={`flex justify-center items-center w-12 h-12 rounded-lg transition-all ${
                        isActive('/login') 
                            ? 'bg-blue-500 text-white' 
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                    <LockClosedIcon className="h-6 w-6 text-white" />
                </a>
            </nav>
        </div>
    )
}

export default Sidebar;
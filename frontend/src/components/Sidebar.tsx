import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  DocumentTextIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";

interface SidebarProps {
  onLogout: () => Promise<void>;
}

function Sidebar({ onLogout }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await onLogout();
    navigate("/login");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-20 h-screen bg-beige flex-shrink-0 flex flex-col items-center pl-4">
      <div className="w-full py-5 flex justify-center">
        <div className="h-[54px] w-[61px] rounded-lg bg-orange flex items-center justify-center">
          <span className="text-[35px] font-regular text-white">tt</span>
        </div>
      </div>

      <nav className="flex flex-col items-center pt-8 space-y-8 w-full">
        <Link
          to="/dashboard"
          className={`flex justify-center items-center h-[40px] w-[54px] rounded-lg  transition-all ${
            isActive("/dashboard")
              ? "bg-focus text-white"
              : "text-gray-400 hover:bg-orange hover:text-white bg-[#B3B3B1]"
          }`}
        >
          <HomeIcon className="h-6 w-6 text-white" />
        </Link>

        <Link
          to="/reviews"
          className={`flex justify-center items-center h-[40px] w-[54px] rounded-lg transition-all ${
            isActive("/reviews")
              ? "bg-focus text-white"
              : "text-gray-400 hover:bg-orange bg-[#B3B3B1]  hover:text-white"
          }`}
        >
          <DocumentTextIcon className="h-6 w-6 text-white" />
        </Link>

        <button
          onClick={handleLogout}
          className={`flex justify-center items-center h-[40px] w-[54px] rounded-lg bg-[#B3B3B1] transition-all ${
            isActive("/logout")
              ? "bg-focus text-white"
              : "text-gray-400 hover:bg-red-500 bg-[#B3B3B1]  hover:text-white"
          }`}
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6 text-white" />
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;

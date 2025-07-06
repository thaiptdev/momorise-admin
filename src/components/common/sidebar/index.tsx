import React from "react";
import { Link, useLocation } from "react-router-dom";
import { User, FileText, Settings, Palette } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      path: "/paintings",
      label: "Painting Management",
      icon: <Palette className="mr-3 h-5 w-5" />,
      primary: true,
    },
    {
      path: "/forms",
      label: "Form Management",
      icon: <FileText className="mr-3 h-5 w-5" />,
    },
    {
      path: "/profile",
      label: "User Information",
      icon: <User className="mr-3 h-5 w-5" />,
    },
    {
      path: "/account",
      label: "Account Management",
      icon: <Settings className="mr-3 h-5 w-5" />,
    },
  ];

  return (
    <aside className="w-64 bg-gray-50 shadow-sm">
      {/* User Info Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {currentUser?.displayName || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {currentUser?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors
                ${
                  isActive(item.path)
                    ? item.primary
                      ? "bg-blue-100 text-blue-700 border-r-2 border-blue-500"
                      : "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <span
                className={
                  isActive(item.path)
                    ? item.primary
                      ? "text-blue-500"
                      : "text-gray-500"
                    : "text-gray-400"
                }
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="mt-8 px-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Quick Stats
        </h3>
        <div className="mt-3 space-y-3">
          <div className="bg-white p-3 rounded-md shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Paintings</span>
              <span className="text-lg font-semibold text-gray-900">24</span>
            </div>
          </div>
          <div className="bg-white p-3 rounded-md shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">New Forms</span>
              <span className="text-lg font-semibold text-blue-600">7</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

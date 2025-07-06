import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/logo_dark.png"
              alt="Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              Welcome, {currentUser?.email}
            </span>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

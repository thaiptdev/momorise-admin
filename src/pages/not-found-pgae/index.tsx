import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleGoHome = () => {
    if (currentUser) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-gray-300 mb-4">404</div>
            <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.464.881-6.062 2.344m-.178 4.406L6 21.75l.172-.172a7.962 7.962 0 010-11.265M6 21.75l5.25-5.25M21.75 6l-5.25 5.25"
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Page Not Found
            </h1>
            <p className="text-gray-600 mb-4">
              Oops! The page you're looking for doesn't exist.
            </p>
            <p className="text-sm text-gray-500">
              The page might have been moved, deleted, or you entered the wrong
              URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleGoHome}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go to {currentUser ? "Dashboard" : "Login"}
            </Button>

            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </Button>
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Need help? Here are some useful links:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {currentUser ? (
                <>
                  <Link
                    to="/home"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Dashboard
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link
                    to="/profile"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Profile
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link
                    to="/settings"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Settings
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Login
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link
                    to="/register"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;

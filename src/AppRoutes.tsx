import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/not-found-pgae";
import MainLayout from "./mainLayout";
import PaintingManagement from "./pages/painting-management";

// Auth Guard: prevent access to login/register when already logged in
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/home" replace /> : <>{children}</>;
};

// Protected Route: prevent access to protected pages when not logged in
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useAuth();
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public routes */}
      <Route
        path="/login"
        element={
          <AuthGuard>
            <LoginPage />
          </AuthGuard>
        }
      />
      <Route
        path="/register"
        element={
          <AuthGuard>
            <RegisterPage />
          </AuthGuard>
        }
      />

      {/* Protected routes with layout */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <MainLayout>
              <HomePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/paintings"
        element={
          <ProtectedRoute>
            <MainLayout>
              <PaintingManagement />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/forms"
        element={
          <ProtectedRoute>
            <MainLayout></MainLayout>
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                <p className="mt-4 text-gray-600">
                  Manage your profile settings here.
                </p>
              </div>
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/account"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AccountPage />
            </MainLayout>
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <MainLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="mt-4 text-gray-600">
                  Configure your application settings.
                </p>
              </div>
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;

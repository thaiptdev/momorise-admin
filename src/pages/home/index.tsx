import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="p-6">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Momorise!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Hello, {currentUser?.email}! You're successfully logged in.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Getting Started
              </h3>
              <p className="text-blue-700">
                Learn how to use all the features of Momorise.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Your Progress
              </h3>
              <p className="text-green-700">
                Track your learning progress and achievements.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Community
              </h3>
              <p className="text-purple-700">
                Connect with other learners and share experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

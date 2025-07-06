import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase"; // adjust the import path
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      console.log("Attempting to sign in with:", email); // Debug log
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login successful:", userCredential.user); // Debug log

      // Navigate to home page after successful login
      navigate("/home");
    } catch (err: any) {
      console.error("Login error:", err); // Debug log

      // Handle specific Firebase auth errors with user-friendly messages
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email address");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/user-disabled":
          setError("This account has been disabled");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please check your connection");
          break;
        case "auth/invalid-credential":
          setError("Invalid email or password");
          break;
        default:
          setError(`Login failed: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen">
      {/* Image */}
      <div className="w-1/2 h-full">
        <img
          src="/images/bg_homepage.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <img src="/images/logo_dark.png" alt="Logo" className="mb-8 w-40" />

        <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-full text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="italic text-sm mb-1 block">Email</label>
            <Input
              type="email"
              className="rounded-full bg-[#B7B748] placeholder:text-black"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="italic text-sm mb-1 block">Password</label>
            <Input
              type="password"
              className="rounded-full bg-[#B7B748] placeholder:text-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-full mt-4"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

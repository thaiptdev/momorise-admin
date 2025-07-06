import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase"; // Adjust the import path as needed

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);

      // Redirect to login page or dashboard after successful registration
      navigate("/login"); // or navigate("/dashboard") if you want to auto-login
    } catch (error: any) {
      console.error("Registration error:", error);

      // Handle specific Firebase auth errors
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/weak-password":
          setError("Password is too weak");
          break;
        default:
          setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen">
      {/* Left Side: Image */}
      <div className="w-1/2 h-full">
        <img
          src="/images/bg_homepage.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        {/* Logo */}
        <img src="/images/logo_dark.png" alt="Logo" className="mb-8 w-40" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full bg-[#B7B748] placeholder:text-black"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="italic text-sm mb-1 block">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-full bg-[#B7B748] placeholder:text-black"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="italic text-sm mb-1 block">
              Confirm Password
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-full bg-[#B7B748] placeholder:text-black"
              placeholder="Confirm your password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-full mt-4"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

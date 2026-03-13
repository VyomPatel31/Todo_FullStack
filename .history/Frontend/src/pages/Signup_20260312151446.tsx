import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

export default function Signup() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate({ to: "/dashboard" })
    }
  }, [navigate])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // SIGNUP
  const handleSignup = async (e: any) => {
    e.preventDefault()

    if (!name || !email || !password) {
      toast.error("All fields are required")
      return
    }


    if (password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)

    try {
      // request an OTP for this email
      await API.post("/auth/sendotp", { email });

      // save info so verify page can complete registration
      sessionStorage.setItem("signupData", JSON.stringify({ name, email, password }));

      toast.success("OTP sent! Please check your email.");
      navigate({ to: "/verify" });
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to send OTP");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">

      <form
        onSubmit={handleSignup}
        className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-md space-y-4"
      >

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Signup</h2>

        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />

        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />


        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password (min 8 chars)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />


        <button
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Signup"}
        </button>

      </form>

    </div>
  )
}
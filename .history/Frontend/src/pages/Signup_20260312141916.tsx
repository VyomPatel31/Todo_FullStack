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
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // SEND OTP
  const sendOTP = async () => {

    if (!email) {
      toast.error("Enter email first")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format")
      return
    }

    try {

      await API.post("/auth/sendotp", {
        email
      })

      toast.success("OTP sent to your email")
      setOtpSent(true)

    } catch (error) {
      console.error(error)
      toast.error("Failed to send OTP")
    }
  }

  // SIGNUP
  const handleSignup = async (e: any) => {
    e.preventDefault()

    if (!name || !email || !password) {
      toast.error("All fields are required")
      return
    }

    if (!otpSent) {
      toast.error("Please verify email with OTP")
      return
    }

    if (!otp) {
      toast.error("Enter OTP")
      return
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)

    try {

      await API.post("/auth/signup", {
        name,
        email,
        password,
        otp
      })

      toast.success("Signup successful! Redirecting to login...")
      navigate({ to: "/login" })

    } catch (error) {
      console.error("Signup error:", error)
      toast.error("Signup failed")

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">

      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-4"
      >

        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>

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

        {/* SEND OTP BUTTON */}

        <button
          type="button"
          onClick={sendOTP}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-black transition"
        >
          Send OTP
        </button>

        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password (min 8 chars)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        {/* OTP INPUT */}

        {otpSent && (
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}

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
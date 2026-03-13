import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

export default function OtpVerify() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signupData, setSignupData] = useState<{
    name: string;
    email: string;
    password: string;
  } | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("signupData");
    if (data) {
      setSignupData(JSON.parse(data));
    } else {
      // no signup info, go back to signup
      navigate({ to: "/signup" });
    }
  }, [navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }
    if (!signupData) return;

    setIsLoading(true);
    try {
      await API.post("/auth/signup", {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        otp,
      });

      toast.success("Registration complete! You can now log in.");
      sessionStorage.removeItem("signupData");
      navigate({ to: "/login" });
    } catch (error) {
      console.error("OTP verify error", error);
      toast.error("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Verify OTP</h2>
        <p className="text-center">
          An OTP has been sent to{' '}
          <strong>{signupData?.email || 'your email'}</strong>
        </p>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={isLoading}
        />

        <button
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
}

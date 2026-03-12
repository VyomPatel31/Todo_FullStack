import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

export default function Signup(){

    const navigate= useNavigate();

    useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      navigate({ to: "/dashboard" })
    }
  },[navigate])

    const[name, setName]= useState("");
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");
    const[isLoading, setIsLoading]=useState(false);

    const handleSignup = async (e:any)=>{
    e.preventDefault()

    if (!name || !email || !password) {
      toast.error("All fields are required")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format")
      return
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)
    try {
      await API.post("/auth/signup",{
        name,
        email,
        password
      })

      toast.success("Signup successful! Redirecting to login...")
      navigate({ to: "/login" })
    } catch (error) {
      console.error("Signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6">
         <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

         <input
           className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
           placeholder="Name"
           value={name}
           onChange={(e)=>setName(e.target.value)}
           disabled={isLoading}
         />
         <input
           className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
           placeholder="Email"
           type="email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
           disabled={isLoading}
         />
         <input
           className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
           placeholder="Password (min 8 chars)"
           type="password"
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
           disabled={isLoading}
         />

         <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-400 transition disabled:opacity-50" disabled={isLoading}>
           {isLoading ? "Signing up..." : "Signup"}
         </button>

      </form>
    </div>
  )

}


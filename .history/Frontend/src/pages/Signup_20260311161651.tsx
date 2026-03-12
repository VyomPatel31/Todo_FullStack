import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

export default function Signup(){

    const navigate= useNavigate();

    useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      navigate("/dashboard")
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
      navigate("/login")
    } catch (error) {
      console.error("Signup error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
         <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

         <input
           className="w-full p-2 mb-3 border rounded"
           placeholder="Name"
           value={name}
           onChange={(e)=>setName(e.target.value)}
           disabled={isLoading}
         />
         <input
           className="w-full p-2 mb-3 border rounded"
           placeholder="Email"
           type="email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
           disabled={isLoading}
         />
         <input
           className="w-full p-2 mb-3 border rounded"
           placeholder="Password (min 8 chars)"
           type="password"
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
           disabled={isLoading}
         />

         <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50" disabled={isLoading}>
           {isLoading ? "Signing up..." : "Signup"}
         </button>

      </form>
    </div>
  )

}


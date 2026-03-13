import { useState, useEffect } from "react"
import API from "../services/api"
import { useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"
import { queryClient } from "../queryClient"

export default function Login(){

  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      navigate({ to: "/dashboard" })
    }
  },[navigate])

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isLoading,setIsLoading] = useState(false)

  const handleLogin = async (e:any)=>{
    e.preventDefault()

    if (!email || !password) {
      toast.error("All fields are required")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format")
      return
    }

    setIsLoading(true)
    try {
      const res = await API.post("/auth/login",{
        email,
        password
      })

      localStorage.setItem("token",res.data.token)
      if(res.data.user) {
        localStorage.setItem("userData", JSON.stringify(res.data.user))
      }
      
      // Clear all cached queries for the new login session
      queryClient.clear()
      
      toast.success("Login successful!")
      navigate({ to: "/dashboard" })
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
      <form onSubmit={handleLogin} className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Login</h2>

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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          disabled={isLoading}
        />

        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-400 transition disabled:opacity-50" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  )
}
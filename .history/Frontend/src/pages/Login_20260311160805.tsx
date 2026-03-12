import { useState, useEffect } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Login(){

  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      navigate("/dashboard")
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
      toast.success("Login successful!")

      navigate("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          disabled={isLoading}
        />

        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  )
}
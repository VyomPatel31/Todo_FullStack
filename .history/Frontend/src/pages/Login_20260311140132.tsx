import { useState, useEffect } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Login(){

  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      navigate("/dashboard")
    }
  },[])

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async (e:any)=>{
    e.preventDefault()

    const res = await API.post("/auth/login",{
      email,
      password
    })

    localStorage.setItem("token",res.data.token)

    navigate("/dashboard")
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Email"
          type="email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Login</button>

      </form>
    </div>
  )
}
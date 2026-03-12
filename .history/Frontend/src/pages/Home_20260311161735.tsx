import { useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"

export default function Home(){

  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      navigate("/dashboard")
    }
  },[navigate])

  return(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to Todo App</h1>
        <p className="text-xl text-white mb-8">Manage your tasks efficiently</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={()=>navigate("/signup")}
            className="bg-white text-blue-500 px-8 py-3 rounded font-bold hover:bg-gray-100"
          >
            Sign Up
          </button>

          <button
            onClick={()=>navigate("/login")}
            className="bg-white text-purple-600 px-8 py-3 rounded font-bold hover:bg-gray-100"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  )

}

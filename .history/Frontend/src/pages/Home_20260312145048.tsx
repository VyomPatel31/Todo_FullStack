import { useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"

export default function Home(){

  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      navigate({ to: "/dashboard" })
    }
  },[navigate])

  return(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Welcome to Todo App</h1>
        <p className="text-lg sm:text-xl text-white mb-8">Manage your tasks efficiently</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={()=>navigate({ to: "/signup" })}
            className="bg-white text-indigo-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold shadow hover:bg-gray-100 transition"
          >
            Sign Up
          </button>

          <button
            onClick={()=>navigate({ to: "/login" })}
            className="bg-white text-indigo-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold shadow hover:bg-gray-100 transition"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  )

}

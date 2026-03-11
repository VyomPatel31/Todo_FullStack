import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup(){

    const navigate= useNavigate();

    const[name, setName]= useState("");
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");

    const handleSignup = async (e:any)=>{
    e.preventDefault()

    await API.post("/auth/signup",{
      name,
      email,
      password
    })

    navigate("/login")
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-full max-w-md">
         <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

         <input
           className="w-full p-2 mb-3 border rounded"
           placeholder="Name"
           onChange={(e)=>setName(e.target.value)}
         />
         <input
           className="w-full p-2 mb-3 border rounded"
           placeholder="Email"
           type="email"
           onChange={(e)=>setEmail(e.target.value)}
         />
         <input
           className="w-full p-2 mb-3 border rounded"
           placeholder="Password"
           type="password"
           onChange={(e)=>setPassword(e.target.value)}
         />

         <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Signup</button>

      </form>
    </div>
  )

}
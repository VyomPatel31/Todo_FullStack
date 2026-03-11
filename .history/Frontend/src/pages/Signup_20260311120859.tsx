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
    <form onSubmit={handleSignup}>
       <h2>Signup</h2>

       <input placeholder="name" onChange={(e)=>setName(e.target.value)}/>
       <input placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
       <input placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>

       <button>Signup</button>

    </form>
  )

}
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup(){

    const navigate= useNavigate();

    const[name, setName]= useState("");
    const[email, setEmail]=useState("");
    const[password, setPasword]=useState("");

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

    </form>
  )

}
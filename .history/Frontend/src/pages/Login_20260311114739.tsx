import { useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Login(){

  const navigate = useNavigate()

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
    <form onSubmit={handleLogin}>

      <h2>Login</h2>

      <input placeholder="email" onChange={(e)=>setEmail(e.target.value)} />

      <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />

      <button>Login</button>

    </form>
  )
}
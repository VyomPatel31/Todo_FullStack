import { useEffect, useState } from "react"
import API from "../services/api"
import type {Todo} from "../types/todo"

export default function Dashboard(){

  const [todos,setTodos] = useState<Todo[]>([])
  const [title,setTitle] = useState("")

  const token = localStorage.getItem("token")

  const getTodos = async ()=>{

    const res = await API.get("/todos",{
      headers:{
        Authorization: token
      }
    })

    setTodos(res.data.data)
  }

  const createTodo = async ()=>{

    await API.post("/todos/create",
      {title},
      {
        headers:{
          Authorization: token
        }
      }
    )

    setTitle("")
    getTodos()
  }

  useEffect(()=>{
    getTodos()
  },[])

  return(
    <div>

      <h2>My Todos</h2>

      <input value={title} onChange={(e)=>setTitle(e.target.value)} />

      <button onClick={createTodo}>Add</button>

      {todos.map((todo)=>(
        <p key={todo._id}>{todo.title}</p>
      ))}

    </div>
  )
}
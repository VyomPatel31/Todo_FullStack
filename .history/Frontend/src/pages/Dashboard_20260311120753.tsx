import { useEffect, useState } from "react"
import API from "../services/api"
import type {Todo} from "../types/todo"

import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"

export default function Dashboard(){

  const [todos,setTodos] = useState<Todo[]>([])
  const token = localStorage.getItem("token")

  const getTodos = async ()=>{
    const res = await API.get("/todos",{
      headers:{
        Authorization: token
      }
    })

    setTodos(res.data.data)
  }

  const createTodo = async (title: string)=>{
    await API.post(
      "/todos/createTodo",
      {title},
      {
        headers:{
          Authorization: token
        }
      }
    )

    getTodos()
  }

  useEffect(()=>{
    getTodos()
  },[])

  return(
    <div>

      <h2>My Todos</h2>

      <TodoForm createTodo={createTodo} />

      <TodoList todos={todos} />

    </div>
  )
}
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

  const deleteTodo = async (id:string)=>{
    await API.delete(`/todos/deleteTodo/${id}`, {
      headers:{ Authorization: token }
    })
    getTodos()
  }

  const toggleTodo = async (id:string)=>{
    // find the todo and flip completed
    const todo = todos.find(t=>t._id===id)
    if(!todo) return
    await API.put(
      `/todos/updateTodo/${id}`,
      { completed: !todo.completed },
      { headers:{ Authorization: token } }
    )
    getTodos()
  }

  const updateTodo = async (id:string, title:string)=>{
    await API.put(
      `/todos/updateTodo/${id}`,
      { title },
      { headers:{ Authorization: token } }
    )
    getTodos()
  }

  useEffect(()=>{
    getTodos()
  },[])

  return(
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">My Todos</h2>

        <TodoForm createTodo={createTodo} />

        <TodoList
          todos={todos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
        />
      </div>
    </div>
  )
}
import { useState, useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"
import { useTodos, useCreateTodo, useDeleteTodo, useToggleTodo, useUpdateTodo } from "../hooks/useTodos"

import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"

export default function Dashboard(){

  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Filtering & Pagination
  const [filter, setFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // TanStack Query hooks
  const { data: todos = [], isLoading, error } = useTodos()
  const createTodoMutation = useCreateTodo()
  const deleteTodoMutation = useDeleteTodo()
  const toggleTodoMutation = useToggleTodo()
  const updateTodoMutation = useUpdateTodo()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      navigate({ to: "/login" })
    } else {
      const userData = localStorage.getItem("userData")
      if(userData) {
        const {name} = JSON.parse(userData)
        setUserName(name)
      }
    }
  },[navigate])

  const handleCreateTodo = async (title: string, description: string, priority: string, dueDate: string)=>{
    await createTodoMutation.mutateAsync({ title, description, priority, dueDate })
  }

  const handleDeleteTodo = async (id:string)=>{
    if(!window.confirm("Are you sure you want to delete this todo?")) return
    await deleteTodoMutation.mutateAsync(id)
  }

  const handleToggleTodo = async (id:string)=>{
    const todo = todos.find(t=>t._id===id)
    if(!todo) return
    await toggleTodoMutation.mutateAsync({ id, completed: todo.completed })
  }

  const handleUpdateTodo = async (id:string, title:string, description:string, priority:string, dueDate:string)=>{
    await updateTodoMutation.mutateAsync({ id, title, description, priority, dueDate })
  }

  // Filter todos
  const filteredTodos = todos.filter(t => {
    if(filter === "completed") return t.completed
    if(filter === "pending") return !t.completed
    if(filter === "high") return t.priority === "high"
    return true
  })

  // Pagination
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage)
  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Export todos
  const exportTodos = () => {
    const dataStr = JSON.stringify(todos, null, 2)
    const dataBlob = new Blob([dataStr], {type: 'application/json'})
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `todos-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    toast.success("Todos exported!")
  }

  useEffect(()=>{
    // Todos are auto-fetched by the query hook
  },[])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
    navigate({ to: "/" })
  }

  const bgClass = isDarkMode ? "bg-gray-900" : "bg-gray-50"
  const cardClass = isDarkMode ? "bg-gray-800 text-white" : "bg-white"

  return(
    <div className={`min-h-screen ${bgClass} p-6`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={()=>setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 p-2 rounded bg-gray-500 text-white"
      >
        {isDarkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div className="max-w-2xl mx-auto">
        {/* User Profile Header */}
        <div className={`${cardClass} p-6 rounded shadow-md mb-6`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Welcome, {userName || "User"}! 👋</h1>
              <p className="text-gray-500 mt-1">Total Todos: {todos.length}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className={`${cardClass} p-4 rounded shadow-md mb-6`}>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{todos.filter(t=>t.completed).length}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-500">{todos.filter(t=>!t.completed).length}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500">{todos.filter(t=>t.priority === "high").length}</p>
              <p className="text-sm text-gray-500">High Priority</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={exportTodos}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
            >
              📥 Export
            </button>
          </div>
        </div>

        {/* Todo Form */}
        <TodoForm createTodo={handleCreateTodo} />

        {/* Filters */}
        <div className={`${cardClass} p-4 rounded shadow-md mb-4 flex space-x-2 flex-wrap gap-2`}>
          <button
            onClick={()=>{setFilter("all"); setCurrentPage(1)}}
            className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            All
          </button>
          <button
            onClick={()=>{setFilter("pending"); setCurrentPage(1)}}
            className={`px-4 py-2 rounded ${filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Pending
          </button>
          <button
            onClick={()=>{setFilter("completed"); setCurrentPage(1)}}
            className={`px-4 py-2 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Completed
          </button>
          <button
            onClick={()=>{setFilter("high"); setCurrentPage(1)}}
            className={`px-4 py-2 rounded ${filter === "high" ? "bg-red-500 text-white" : "bg-gray-200"}`}
          >
            High Priority
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className={`${cardClass} p-8 text-center rounded shadow-md`}>
            <p className="text-gray-500">Loading todos...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && paginatedTodos.length === 0 && (
          <div className={`${cardClass} p-12 text-center rounded shadow-md`}>
            <p className="text-2xl mb-2">📭</p>
            <p className="text-gray-500">
              {filter === "all" ? "No todos yet. Create one to get started!" : `No ${filter} todos`}
            </p>
          </div>
        )}

        {/* Todos List */}
        {!isLoading && paginatedTodos.length > 0 && (
          <>
            <TodoList
              todos={paginatedTodos}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={`${cardClass} p-4 rounded shadow-md mt-4 flex justify-center space-x-2`}>
                <button
                  onClick={()=>setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                >
                  ← Prev
                </button>
                <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={()=>setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
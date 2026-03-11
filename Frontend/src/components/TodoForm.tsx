import { useState } from "react"

interface Props{
  createTodo:(title:string, description:string, priority:string, dueDate:string)=>void
}

export default function TodoForm({createTodo}:Props){

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [priority,setPriority] = useState("medium")
  const [dueDate,setDueDate] = useState("")

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()

    if(!title) return

    createTodo(title, description, priority, dueDate)

    setTitle("")
    setDescription("")
    setPriority("medium")
    setDueDate("")
  }

  return(

    <form onSubmit={handleSubmit} className="space-y-4 mb-4 p-4 border rounded-lg bg-gray-50">

      <div className="flex space-x-2">
        <input
          className="flex-1 p-2 border rounded"
          value={title}
          placeholder="Enter todo title"
          onChange={(e)=>setTitle(e.target.value)}
        />

        <select
          className="p-2 border rounded"
          value={priority}
          onChange={(e)=>setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <textarea
        className="w-full p-2 border rounded"
        value={description}
        placeholder="Enter description (optional)"
        rows={3}
        onChange={(e)=>setDescription(e.target.value)}
      />

      <div className="flex space-x-2">
        <input
          type="date"
          className="flex-1 p-2 border rounded"
          value={dueDate}
          onChange={(e)=>setDueDate(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Add Todo</button>
      </div>

    </form>

  )

}
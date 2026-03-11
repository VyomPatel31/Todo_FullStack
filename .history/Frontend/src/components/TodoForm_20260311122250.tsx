import { useState } from "react"

interface Props{
  createTodo:(title:string)=>void
}

export default function TodoForm({createTodo}:Props){

  const [title,setTitle] = useState("")

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()

    if(!title) return

    createTodo(title)

    setTitle("")
  }

  return(

    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">

      <input
        className="flex-1 p-2 border rounded"
        value={title}
        placeholder="Enter todo"
        onChange={(e)=>setTitle(e.target.value)}
      />

      <button className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">Add</button>

    </form>

  )

}
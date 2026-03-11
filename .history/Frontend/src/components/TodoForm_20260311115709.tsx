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

    <form onSubmit={handleSubmit}>

      <input
        value={title}
        placeholder="Enter todo"
        onChange={(e)=>setTitle(e.target.value)}
      />

      <button>Add</button>

    </form>

  )

}
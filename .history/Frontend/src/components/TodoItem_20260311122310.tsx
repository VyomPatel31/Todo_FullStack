import type{ Todo } from "../types/todo"

import { useState } from "react"
import type{ Todo } from "../types/todo"

interface Props{
  todo:Todo
  onDelete:(id:string)=>void
  onToggle:(id:string)=>void
  onUpdate:(id:string, title:string)=>void
}

export default function TodoItem({todo,onDelete,onToggle,onUpdate}:Props){

  const [isEditing,setIsEditing] = useState(false)
  const [editTitle,setEditTitle] = useState(todo.title)

  const handleSave = () => {
    if(editTitle && editTitle !== todo.title){
      onUpdate(todo._id, editTitle)
    }
    setIsEditing(false)
  }

  return(
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={()=>onToggle(todo._id)}
        />
        {isEditing ? (
          <input
            className="border p-1 rounded"
            value={editTitle}
            onChange={e=>setEditTitle(e.target.value)}
          />
        ) : (
          <p className={todo.completed ? "line-through" : ""}>{todo.title}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {isEditing ? (
          <button
            className="text-green-500"
            onClick={handleSave}
          >Save</button>
        ) : (
          <button
            className="text-blue-500"
            onClick={()=>setIsEditing(true)}
          >Edit</button>
        )}
        <button
          className="text-red-500"
          onClick={()=>onDelete(todo._id)}
        >Delete</button>
      </div>
    </div>
  )

}
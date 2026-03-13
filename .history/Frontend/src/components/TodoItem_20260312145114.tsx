import { useState } from "react"
import type{ Todo } from "../types/todo"

interface Props{
  todo:Todo
  onDelete:(id:string)=>void
  onToggle:(id:string)=>void
  onUpdate:(id:string, title:string, description:string, priority:string, dueDate:string)=>void
}

export default function TodoItem({todo,onDelete,onToggle,onUpdate}:Props){

  const [isEditing,setIsEditing] = useState(false)
  const [editTitle,setEditTitle] = useState(todo.title)
  const [editDescription,setEditDescription] = useState(todo.description || "")
  const [editPriority,setEditPriority] = useState(todo.priority)
  const [editDueDate,setEditDueDate] = useState(todo.dueDate || "")

  const handleSave = () => {
    if(editTitle && editTitle !== todo.title){
      onUpdate(todo._id, editTitle, editDescription, editPriority, editDueDate)
    }
    setIsEditing(false)
  }

  const getPriorityColor = (priority:string) => {
    switch(priority){
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const priorityBorder =
    todo.priority === 'high'
      ? 'border-red-500'
      : todo.priority === 'medium'
      ? 'border-yellow-500'
      : 'border-green-500';

  return(
    <div className={`p-4 bg-white rounded-lg shadow hover:shadow-md mb-3 border-l-4 ${priorityBorder}`}>
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={()=>onToggle(todo._id)}
            className="mt-1"
          />

          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  className="w-full border p-2 rounded"
                  value={editTitle}
                  onChange={e=>setEditTitle(e.target.value)}
                  placeholder="Title"
                />
                <textarea
                  className="w-full border p-2 rounded"
                  value={editDescription}
                  onChange={e=>setEditDescription(e.target.value)}
                  placeholder="Description"
                  rows={2}
                />
                <div className="flex space-x-2">
                  <select
                    className="border p-2 rounded"
                    value={editPriority}
                    onChange={e=>setEditPriority(e.target.value as "low" | "medium" | "high")}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <input
                    type="date"
                    className="border p-2 rounded"
                    value={editDueDate}
                    onChange={e=>setEditDueDate(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className={`font-semibold ${todo.completed ? "line-through text-gray-500" : ""}`}>
                    {todo.title}
                  </h3>
                  <span className={`text-sm font-medium ${getPriorityColor(todo.priority)}`}>
                    {todo.priority.toUpperCase()}
                  </span>
                </div>

                {todo.description && (
                  <p className={`text-sm text-gray-600 mb-1 ${todo.completed ? "line-through" : ""}`}>
                    {todo.description}
                  </p>
                )}

                {todo.dueDate && (
                  <p className="text-xs text-gray-500">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-0 sm:ml-4 mt-4 sm:mt-0">
          {isEditing ? (
            <button
              className="text-green-600 hover:text-green-800 font-semibold"
              onClick={handleSave}
            >Save</button>
          ) : (
            <button
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
              onClick={()=>setIsEditing(true)}
            >Edit</button>
          )}
          <button
            className="text-red-600 hover:text-red-800 font-semibold"
            onClick={()=>onDelete(todo._id)}
          >Delete</button>
        </div>
      </div>
    </div>
  )

}
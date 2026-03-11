import type{ Todo } from "../types/todo"
import TodoItem from "./TodoItem"

interface Props{
  todos:Todo[]
  onDelete:(id:string)=>void
  onToggle:(id:string)=>void
  onUpdate:(id:string, title:string)=>void
}

export default function TodoList({todos,onDelete,onToggle,onUpdate}:Props){

  return(

    <div>

      {todos.map((todo)=>(
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}

    </div>

  )

}
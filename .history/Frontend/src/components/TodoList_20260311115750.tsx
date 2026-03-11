import type{ Todo } from "../types/todo"
import TodoItem from "./TodoItem"

interface Props{
  todos:Todo[]
}

export default function TodoList({todos}:Props){

  return(

    <div>

      {todos.map((todo)=>(
        <TodoItem key={todo._id} todo={todo} />
      ))}

    </div>

  )

}
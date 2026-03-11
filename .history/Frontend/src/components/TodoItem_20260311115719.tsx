import { Todo } from "../types/todo"

interface Props{
  todo:Todo
}

export default function TodoItem({todo}:Props){

  return(

    <div>

      <p>{todo.title}</p>

    </div>

  )

}
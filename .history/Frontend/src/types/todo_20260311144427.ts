export interface Todo{
    _id:string
    title:string
    description?:string
    priority:'low'|'medium'|'high'
    dueDate?:string
    completed:boolean
}